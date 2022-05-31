import * as React from "react"
import { Restaurant } from "../../shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from "uuid"
import RestaurantItem from "../RestaurantItem"

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
