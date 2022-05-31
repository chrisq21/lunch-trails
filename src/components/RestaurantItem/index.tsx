import * as React from "react"
import { Restaurant } from "../../types/shared-types"

import {
  ItemContainer,
  InnerContainer,
  DescriptionContainer,
  StarsContainer,
  Title,
  Text,
} from "./styles"

import PriceLevel from './priceLevel'
import StarRating from "./starRating"

interface Props {
  restaurant: Restaurant
}

const RestaurantItem = ({ restaurant }: Props) => {
  const { name, rating, user_ratings_total, price_level, price_id } = restaurant
  return (
    <ItemContainer>
      <InnerContainer>
        <div>Image</div>
        <DescriptionContainer>
          <Title>{name}</Title>
          <StarsContainer>
            <StarRating numActiveStars={rating} />
            <Text>({user_ratings_total})</Text>
          </StarsContainer>
          <div>
            <PriceLevel numDollarSigns={price_level} />
            <Text> • Supporting Text</Text>
          </div>
        </DescriptionContainer>
      </InnerContainer>
      <div>Favorite</div>
    </ItemContainer>
  )
}

export default RestaurantItem
