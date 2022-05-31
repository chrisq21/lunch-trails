import * as React from "react"
import { Restaurant } from "../../shared-types"

import { ItemContainer, InnerContainer, DescriptionContainer, StarsContainer, Title, Text } from "./styles"

interface Props {
  restaurant: Restaurant
}

const RestaurantItem = ({ restaurant }: Props) => {
  const { name, rating, user_ratings_total, price_level, price_id } = restaurant
  return (
    <ItemContainer>
      <InnerContainer>
        <div>
          Image
        </div>
        <DescriptionContainer>
          <Title>{name}</Title>
          <StarsContainer>
            Stars
            <Text>({user_ratings_total})</Text>
          </StarsContainer>
          <div>
            Price level
            <Text> • Supporting Text</Text>
          </div>
        </DescriptionContainer>
      </InnerContainer>
      <div>
        Favorite
      </div>
    </ItemContainer>
  )
}

export default RestaurantItem
