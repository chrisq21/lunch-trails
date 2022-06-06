import React, { useEffect, useState } from "react"

const baseRequestOptions = {
  radius: 1500,
  key: process.env.GATSBY_PLACES_API_KEY,
  type: "restaurant",
}

const placesArrayAreEqual = (placeArrayA, placeArrayB) => {
  return placeArrayA.length === placeArrayB.length &&
    placeArrayB.every(({ place_id }) =>
      placeArrayA.some(staticPlace => staticPlace.place_id === place_id)
    )
}

const useNearbySearchService = (
  map,
  service,
  searchQuery,
  staticContent = []
) => {
  const [places, setPlaces] = useState(staticContent)

  useEffect(() => {
    if (map) {
      const requestOptions = {
        ...baseRequestOptions,
        location: map.getCenter(),
        keyword: searchQuery || '',
      }

      const fetchPlaces = () => {
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

                const detailsPromise = new Promise(resolve => {
                  service.getDetails(detailsRequest, placeDetails => {
                    resolve({ ...place, ...placeDetails })
                  })
                })
                detailsPromises.push(detailsPromise)
              })

              try {
                const placesWithDetails = await Promise.all(detailsPromises)

                // If new places array the same as static content array, don't update places state.
                if (!placesArrayAreEqual(staticContent, placesWithDetails)) {
                  setPlaces(placesWithDetails)
                } else {
                  if(searchQuery !== null) {
                    setPlaces(placesWithDetails)
                  }
                }

                console.log(placesArrayAreEqual)
              } catch (error) {
                // Report error.
              }
            }
          })
        } catch (error) {
          // Report error.
        }
      }
      fetchPlaces()
    }
  }, [map, searchQuery])

  return places
}

export default useNearbySearchService
