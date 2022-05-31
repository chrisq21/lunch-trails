import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { Restaurant } from "../../types/shared-types"

import {
  ItemContainer,
  InnerContainer,
  DescriptionContainer,
  StarsContainer,
  Title,
  Text,
  HeartImg,
} from "./styles"

import PriceLevel from "./priceLevel"
import StarRating from "./starRating"
import {
  addFavoriteRestaurantIdToLocalStorage,
  removeFavoriteRestaurantIdFromLocalStorage,
} from "../utils/favoriteRestaurants"

import heartActiveSrc from "../../assets/images/heart-active.png"
import heartSrc from "../../assets/images/heart.png"

interface Props {
  restaurant: Restaurant
  isPopup?: boolean
  isFavoriteRestaurant?: boolean
  isActive?: boolean
  isMarkerSelected?: boolean
  setFavoriteRestaurantIds?: Dispatch<SetStateAction<string[]>>
  setActiveRestaurantId?: Dispatch<SetStateAction<string>>
}

const RestaurantItem = ({
  restaurant,
  isFavoriteRestaurant,
  isActive,
  isMarkerSelected,
  isPopup = false,
  setFavoriteRestaurantIds,
  setActiveRestaurantId,
}: Props) => {
  const { name, rating, user_ratings_total, price_level, place_id } = restaurant

  const handleMouseEnter = () => {
    if (!isMarkerSelected) {
      setActiveRestaurantId(place_id)
    }
  }

  const handleMouseLeave = () => {
    if (!isMarkerSelected) {
      setActiveRestaurantId(null)
    }
  }

  const handleFavoriteClicked = (restaurantId: string, isFavorite: boolean) => {
    let favoriteRestaurantIds = []
    if (isFavorite) {
      favoriteRestaurantIds =
        removeFavoriteRestaurantIdFromLocalStorage(restaurantId)
    } else {
      favoriteRestaurantIds =
        addFavoriteRestaurantIdToLocalStorage(restaurantId)
    }

    // Update favorite restaurants state.
    setFavoriteRestaurantIds(favoriteRestaurantIds)
  }

  // Add listeners only if this item is not a map popup.
  const containerListeners = !isPopup
    ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {}

  return (
    <ItemContainer
      isActive={isActive}
      isPopup={isPopup}
      {...containerListeners}
    >
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
      {!isPopup && (
        <div>
          <HeartImg
            src={isFavoriteRestaurant ? heartActiveSrc : heartSrc}
            alt={isFavoriteRestaurant ? "favorited" : "not favorited"}
            onClick={() =>
              handleFavoriteClicked(place_id, isFavoriteRestaurant)
            }
          />
        </div>
      )}
    </ItemContainer>
  )
}

export default RestaurantItem
