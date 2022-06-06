import React, { useEffect, Dispatch, SetStateAction } from "react"
import { Restaurant } from "../../types/shared-types"
import { MapOuterContainer, MapContainer } from "./styles"

import RestaurantItem from "../restaurantItem"
import usePopup from "../../hooks/usePopup"
import useMarkers from "../../hooks/useMarkers"

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
  const popup = usePopup(google, map, "content")
  const [ clickedPlaceId, setClickedPlaceId ] = useMarkers(
    google,
    map,
    restaurants,
    popup,
    activeRestaurantId,
    setActiveRestaurantId
  )

  useEffect(() => {
    if (map) {
      map.addListener("click", () => {
        setClickedPlaceId(null)
        setActiveRestaurantId(null)
      })
    }
  }, [map])

  const getPopupItem = () => {
    const restaurant = restaurants.find(
      ({ place_id }) => activeRestaurantId === place_id
    )
    return restaurant && <RestaurantItem isPopup restaurant={restaurant} />
  }

  return (
    <>
      <div id="content">{clickedPlaceId && getPopupItem()}</div>
      <MapOuterContainer>
        <MapContainer id="map"></MapContainer>
      </MapOuterContainer>
    </>
  )
}

export default Map
