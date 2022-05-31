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

import starImg from '../../assets/images/star.png'

interface Props {
  restaurant: Restaurant
}

const renderStars = numActive => {
  let stars = []
  for (let i = 0; i < 5; i++) {
    const isActiveStar = i < numActive
    const starSrc = isActiveStar
      ? "/images/star-active.png"
      : "/images/star.png"
    stars.push(<img key={i} src={starImg} alt="star" />)
  }
  return stars
}

const renderPriceLevel = numDollarSigns => {
  let dollarSigns = []
  for (let i = 0; i < numDollarSigns; i++) {
    dollarSigns.push(<Text key={i}>$</Text>)
  }

  return dollarSigns
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
            {renderStars(rating)}
            <Text>({user_ratings_total})</Text>
          </StarsContainer>
          <div>
            {renderPriceLevel(Math.floor(price_level))}
            <Text> • Supporting Text</Text>
          </div>
        </DescriptionContainer>
      </InnerContainer>
      <div>Favorite</div>
    </ItemContainer>
  )
}

export default RestaurantItem
