import * as React from "react"
import { Restaurant } from "../../types/shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from "uuid"
import RestaurantItem from "../restaurantItem"
import getSortedRestaurants from "./utils/getSortedRestaurants"
import { SortOptions } from "../../consts/sortOptions"

interface Props {
  restaurants: Restaurant[]
  sortOrder: SortOptions
}

const RestaurantList = ({ restaurants, sortOrder }: Props) => {
  const sortedRestaurants = getSortedRestaurants(restaurants, sortOrder)
  return (
    <ListContainer>
      {sortedRestaurants.map(restaurant => (
        <RestaurantItem restaurant={restaurant} key={uuidv4()} />
      ))}
    </ListContainer>
  )
}

export default RestaurantList
