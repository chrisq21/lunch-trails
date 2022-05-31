import React, { useEffect, useState } from "react"
import { Restaurant } from "../../types/shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from "uuid"
import RestaurantItem from "../restaurantItem"
import getSortedRestaurants from "./utils/getSortedRestaurants"
import { SortOptions } from "../../consts/sortOptions"
import { getFavoritesFromLocalStorage } from "../utils/favoriteRestaurants"

interface Props {
  restaurants: Restaurant[]
  sortOrder: SortOptions
}

const RestaurantList = ({ restaurants, sortOrder }: Props) => {
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>(
    []
  )
  const sortedRestaurants = getSortedRestaurants(restaurants, sortOrder)

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
          isFavoriteRestaurant={favoriteRestaurantIds.includes(
            restaurant.place_id
          )}
          setFavoriteRestaurantIds={setFavoriteRestaurantIds}
        />
      ))}
    </ListContainer>
  )
}

export default RestaurantList
