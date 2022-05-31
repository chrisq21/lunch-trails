import * as React from "react"
import { Restaurant } from "../../types/shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from "uuid"
import RestaurantItem from "../restaurantItem"

const RestaurantList = ({ restaurants }: { restaurants: Restaurant[] }) => {
  return (
    <ListContainer>
      {restaurants.map(restaurant => (
        <RestaurantItem restaurant={restaurant} key={uuidv4()} />
      ))}
    </ListContainer>
  )
}

export default RestaurantList
