import * as React from "react"
import { Restaurant } from "../../shared-types"

import {
  ItemContainer,
} from "./styles"

interface Props {
  restaurant: Restaurant
}

const RestaurantItem = ({
  restaurant
}: Props) => {
  
  return (
    <ItemContainer >
      {restaurant.name}
    </ItemContainer>
  )
}

export default RestaurantItem
