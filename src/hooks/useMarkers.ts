import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import defaultIcon from "../assets/images/marker-default.png"
import activeIcon from "../assets/images/marker-active.png"
import clickedIcon from "../assets/images/marker-clicked.png"

const useMarkers = (
  google,
  map,
  places,
  popup,
  activePlaceId,
  setActivePlaceId
): [string, Dispatch<SetStateAction<string>>] => {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [clickedPlaceId, setClickedPlaceId] = useState<string>()

  useEffect(() => {
    const createMarkers = () => {
      markers.forEach(marker => {
        marker.setMap(null)
      })

      const newMarkers = []
      places.forEach(place => {
        if (!place?.geometry?.location) return

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: defaultIcon,
          placeId: place.place_id,
          clicked: false,
        })

        google.maps.event.addListener(marker, "click", () => {
          marker.clicked = true
          popup.position = marker.position
          setActivePlaceId(place.place_id)
          setClickedPlaceId(place.place_id)
        })

        newMarkers.push(marker)
      })

      setMarkers(newMarkers)
    }
    if (google && map && popup && places.length) {
      createMarkers()
    }
  }, [google, map, popup, places])

  React.useEffect(() => {
    const setMarkerIcons = () => {
      markers.forEach(marker => {
        if (activePlaceId === marker.placeId) {
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

    if (markers.length) {
      setMarkerIcons()
    }
  }, [popup, markers, activePlaceId])

  useEffect(() => {
    if (popup) {
      if (clickedPlaceId === activePlaceId) {
        popup.setMap(map)
      } else {
        setClickedPlaceId(null)
      }
    }
  }, [popup, clickedPlaceId, activePlaceId])

  return [clickedPlaceId, setClickedPlaceId]
}

export default useMarkers
