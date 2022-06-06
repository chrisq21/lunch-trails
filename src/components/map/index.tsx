import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Restaurant } from "../../types/shared-types"
import { MapOuterContainer, MapContainer } from "./styles"
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader"
import { SFCoordinates } from "../../consts/map"
import createPopupClass from "./createPopupClass"
import RestaurantItem from "../restaurantItem"
import defaultIcon from "../../assets/images/marker-default.png"
import activeIcon from "../../assets/images/marker-active.png"
import clickedIcon from "../../assets/images/marker-clicked.png"
import useGoogleMapsApi from "../../hooks/useGoogleMapsApi"

let markers = []
let popup

interface Props {
  restaurants: Restaurant[]
  searchQuery: string
  activeRestaurantId: string | null
  setRestaurants: Dispatch<SetStateAction<Restaurant[]>>
  setActiveRestaurantId: Dispatch<SetStateAction<string>>
}

const Map = ({
  restaurants,
  searchQuery,
  activeRestaurantId,
  setRestaurants,
  setActiveRestaurantId,
}: Props) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(null)

  const loaderOptions: LoaderOptions = {
    apiKey: process.env.GATSBY_PLACES_API_KEY || process.env.PLACES_API_KEY,
    libraries: ["places"],
  }

  const mapOptions: google.maps.MapOptions = {
    center: { lat: SFCoordinates.lat, lng: SFCoordinates.lng },
    zoom: 15,
    disableDefaultUI: true,
  }

  const { google, map, service } = useGoogleMapsApi(
    loaderOptions,
    mapOptions,
    "map"
  )

  /* 
    Request restaurants & update restaurants state.
  */
  useEffect(() => {
    if (map) {
      const getRestaurants = (keyword: string) => {
        const request = {
          location: map.getCenter(),
          radius: 1500,
          key: process.env.GATSBY_PLACES_API_KEY,
          type: "restaurant",
          keyword,
        }

        let restaurantsWithDetails = []
        try {
          // Fetch restaurants using Nearby Search api
          let detailsRequestCount = 0
          service.nearbySearch(request, (restaurants, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              restaurants.forEach((restaurant, index) => {
                const detailsRequest = {
                  placeId: restaurant.place_id,
                  fields: ["website"],
                }

                // Fetch restaurant details in order to access website url.
                service.getDetails(
                  detailsRequest,
                  (restuarantWithDetails, status) => {
                    detailsRequestCount++
                    if (
                      status == google.maps.places.PlacesServiceStatus.OK &&
                      restuarantWithDetails?.website
                    ) {
                      restaurantsWithDetails.push({
                        ...restaurant,
                        website: restuarantWithDetails?.website,
                      })
                    }

                    // Since the Places Api doesn't return a promise, we need an alternative way of knowing when all requests are complete.
                    // Once the total number of requests equals the restaurant array length, the details requests are done. Update the restaurants state.
                    if (detailsRequestCount === restaurants.length - 1) {
                      setRestaurants(restaurantsWithDetails)
                    }
                  }
                )
              })
            }
          })
        } catch (error) {
          // Send error to monitoring service
          console.error(error)
        }
      }
      getRestaurants(searchQuery)
    }
  }, [map, searchQuery])

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
          // popup.setMap(map)
          // popup.position = marker.position
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
