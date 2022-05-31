import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Restaurant } from "../../types/shared-types"
import { MapOuterContainer, MapContainer } from "./styles"
import { Loader } from "@googlemaps/js-api-loader"
import { SFCoordinates } from "../../consts/map"
import defaultIcon from "../../assets/images/marker-default.png"
import activeIcon from "../../assets/images/marker-active.png"
import clickedIcon from "../../assets/images/marker-clicked.png"
  
let map
let service
let google
let markers = []

interface Props {
  restaurants: Restaurant[]
  setRestaurants: Dispatch<SetStateAction<Restaurant[]>>
  setActiveRestaurantId: Dispatch<SetStateAction<string>>
  searchQuery: string
  activeRestaurantId: string | null
}
const Map = ({
  restaurants,
  setRestaurants,
  setActiveRestaurantId,
  searchQuery,
  activeRestaurantId,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)

  // Create Map Instance.
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.PLACES_API_KEY,
        version: "weekly",
        libraries: ["places"],
      })

      try {
        google = await loader.load()

        // Set initial map center to San Francisco coordinates
        const defaultCenter = new google.maps.LatLng(
          SFCoordinates.lat,
          SFCoordinates.lng
        )

        map = new google.maps.Map(document.getElementById("map"), {
          center: defaultCenter,
          zoom: 15,
          disableDefaultUI: true,
        })

        service = new google.maps.places.PlacesService(map)
        setIsLoaded(true)
      } catch (error) {
        // Send error data to error reporter.
        console.error(error)
      }
    }

    initMap()
  }, [])

  // Request restaurants from PlacesService & update restaurants state.
  useEffect(() => {
    if (isLoaded) {
      const getRestaurants = (keyword: string) => {
        const request = {
          location: map.getCenter(),
          radius: 1500,
          key: process.env.PLACES_API_KEY,
          type: "restaurant",
          keyword,
        }

        try {
          service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              setRestaurants(results)
            }
          })
        } catch (error) {
          // Send error to monitoring service
          console.error(error)
        }
      }
      getRestaurants(searchQuery)
    }
  }, [isLoaded, searchQuery])

  // Add markers to map from restaurants array.
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
          setActiveRestaurantId(restaurant.place_id)
        })

        markers.push(marker)
      })
    }
    if (isLoaded && restaurants.length) {
      createMarkers()
    }
  }, [isLoaded, restaurants])

  // Update marker icon based off of activeRestaurantId state.
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
    if (isLoaded) {
      setMarkerIcons(activeRestaurantId)
    }
  }, [isLoaded, activeRestaurantId])

  return (
    <>
      <MapOuterContainer>
        <MapContainer id="map">Map</MapContainer>
      </MapOuterContainer>
    </>
  )
}

export default Map
