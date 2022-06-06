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
          let detailsPromises = []
          service.nearbySearch(requestOptions, async (places, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // Use the details api in order to access a place's website.
              // Only access details for the first 9 places so that we don't go over the details api quota.
              const placesSubarray = places.slice(0, 9)
              placesSubarray.forEach(place => {
                const detailsRequest = {
                  placeId: place.place_id,
                  fields: ["website"],
                }

                const detailsPromise = new Promise((resolve, reject) => {
                  service.getDetails(detailsRequest, (placeDetails, status) => {
                    if (
                      status == google.maps.places.PlacesServiceStatus.OK &&
                      placeDetails?.website
                    ) {
                      resolve({ ...place, ...placeDetails })
                    } else {
                      reject("No details found")
                    }
                  })
                })
                detailsPromises.push(detailsPromise)
              })

              try {
                const placesWithDetails = await Promise.all(detailsPromises)
                console.log(placesWithDetails)
                setPlaces(placesWithDetails)
              } catch (error) {
                console.log(error)
              }
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
