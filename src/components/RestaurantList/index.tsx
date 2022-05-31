import * as React from "react"
import { Restaurant } from "../../types/shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from "uuid"
import RestaurantItem from "../restaurantItem"
import getSortedRestaurants from "./utils/getSortedRestaurants"

interface Props {
  restaurants: Restaurant[]
  shouldSortAscending: boolean
}

const RestaurantList = ({ restaurants, shouldSortAscending }: Props) => {
  const sortedRestaurants = getSortedRestaurants(restaurants, shouldSortAscending)
  return (
    <ListContainer>
      {sortedRestaurants.map(restaurant => (
        <RestaurantItem restaurant={restaurant} key={uuidv4()} />
      ))}
    </ListContainer>
  )
}

export default RestaurantList
