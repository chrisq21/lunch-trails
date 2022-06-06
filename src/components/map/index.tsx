import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Restaurant } from "../../types/shared-types"
import { MapOuterContainer, MapContainer } from "./styles"

import RestaurantItem from "../restaurantItem"
import defaultIcon from "../../assets/images/marker-default.png"
import activeIcon from "../../assets/images/marker-active.png"
import clickedIcon from "../../assets/images/marker-clicked.png"
import usePopup from "../../hooks/usePopup"

let markers = []

interface Props {
  google?: typeof google
  map?: google.maps.Map
  service?: google.maps.places.PlacesService
  restaurants: Restaurant[]
  searchQuery: string
  activeRestaurantId: string | null
  setActiveRestaurantId: Dispatch<SetStateAction<string>>
}

const Map = ({
  google,
  map,
  restaurants,
  activeRestaurantId,
  setActiveRestaurantId,
}: Props) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(null)
  const { popup, shouldShowPopup } = usePopup(google, map, "content")

  useEffect(() => {
    if (!shouldShowPopup) {
      setSelectedRestaurantId(null)
      setActiveRestaurantId(null)
    }
  }, [shouldShowPopup])

  /*
    Add markers to map from restaurants array.
  */
  useEffect(() => {
    const createMarkers = () => {
      markers.forEach(marker => {
        marker.setMap(null)
      })
      markers = []

      restaurants.forEach(restaurant => {
        if (!restaurant?.geometry?.location) return

        const marker = new google.maps.Marker({
          map,
          position: restaurant.geometry.location,
          icon: defaultIcon,
          placeId: restaurant.place_id,
          clicked: false,
        })

        google.maps.event.addListener(marker, "click", () => {
          marker.clicked = true
          popup.setMap(map)
          popup.position = marker.position
          setActiveRestaurantId(restaurant.place_id)
          setSelectedRestaurantId(restaurant.place_id)
        })

        markers.push(marker)
      })
    }
    if (map && restaurants.length) {
      createMarkers()
    }
  }, [map, restaurants])

  /*
    Update marker icon based off of activeRestaurantId state.
  */
  React.useEffect(() => {
    const setMarkerIcons = activeRestaurantId => {
      markers.forEach(marker => {
        if (activeRestaurantId === marker.placeId) {
          marker.setIcon(activeIcon)
        } else {
          if (marker.clicked) {
            marker.setIcon(clickedIcon)
          } else {
            marker.setIcon(defaultIcon)
          }
        }
      })
    }

    if (map) {
      setMarkerIcons(activeRestaurantId)

      // Hide the selected restaruant popup if a new restaurant is active
      if (selectedRestaurantId !== activeRestaurantId) {
        setSelectedRestaurantId(null)
      }
    }
  }, [map, activeRestaurantId])

  const getPopupItem = () => {
    const restaurant = restaurants.find(
      ({ place_id }) => activeRestaurantId === place_id
    )

    return restaurant && <RestaurantItem isPopup restaurant={restaurant} />
  }

  return (
    <>
      <div id="content">{selectedRestaurantId && getPopupItem()}</div>
      <MapOuterContainer>
        <MapContainer id="map"></MapContainer>
      </MapOuterContainer>
    </>
  )
}

export default Map
