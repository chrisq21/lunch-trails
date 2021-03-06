import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Restaurant } from "../../types/shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from "uuid"
import RestaurantItem from "../restaurantItem"
import getSortedRestaurantsByRating from "./utils/getSortedRestaurantsByRating"
import { SortOptions } from "../../consts/sortOptions"
import { getFavoritesFromLocalStorage } from "../../utils/favoriteRestaurants"

interface Props {
  restaurants: Restaurant[]
  sortOrder: SortOptions
  activeRestaurantId: string | null
  setActiveRestaurantId: Dispatch<SetStateAction<string>>
}

const RestaurantList = ({
  restaurants,
  sortOrder,
  activeRestaurantId,
  setActiveRestaurantId,
}: Props) => {
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>(
    []
  )
  const sortedRestaurants = getSortedRestaurantsByRating(restaurants, sortOrder)

  // Set favoriteRestaurantIds to local storage value on initial render.
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
    if (favoritesFromLocalStorage?.length) {
      setFavoriteRestaurantIds(favoritesFromLocalStorage)
    }
  }, [])

  return (
    <ListContainer>
      {sortedRestaurants.map(restaurant => (
        <RestaurantItem
          key={uuidv4()}
          restaurant={restaurant}
          isActive={restaurant.place_id === activeRestaurantId}
          isFavoriteRestaurant={favoriteRestaurantIds.includes(
            restaurant.place_id
          )}
          setActiveRestaurantId={setActiveRestaurantId}
          setFavoriteRestaurantIds={setFavoriteRestaurantIds}
        />
      ))}
    </ListContainer>
  )
}

export default RestaurantList
