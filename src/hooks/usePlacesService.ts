import React, { useEffect, useState } from "react"
import { SFCoordinates } from "../consts/map"

const baseRequestOptions = {
  location: { lat: SFCoordinates.lat, lng: SFCoordinates.lng },
  radius: 1500,
  key: process.env.GATSBY_PLACES_API_KEY,
  type: "restaurant",
}

const useNearbySearchService = (map, service, searchQuery = "") => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const requestOptions = {
      ...baseRequestOptions,
      keyword: searchQuery,
    }

    if (map) {
      const getPlaces = () => {
        try {
          service.nearbySearch(requestOptions, (places, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              setPlaces(places)
            }
          })
        } catch (error) {
          // Report error.
        }
      }
      getPlaces()
    }
  }, [map, searchQuery])

  return places
}

export default useNearbySearchService
