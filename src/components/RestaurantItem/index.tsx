import React, { Dispatch, SetStateAction, useEffect } from "react"
import { Restaurant } from "../../types/shared-types"

import {
  ItemContainer,
  InnerContainer,
  DescriptionContainer,
  StarsContainer,
  Title,
  Text,
  HeartImg,
  RestaurantImage,
} from "./styles"

import PriceLevel from "./priceLevel"
import StarRating from "./starRating"
import {
  addFavoriteRestaurantIdToLocalStorage,
  removeFavoriteRestaurantIdFromLocalStorage,
} from "../../utils/favoriteRestaurants"

import heartActiveSrc from "../../assets/images/heart-active.png"
import heartSrc from "../../assets/images/heart.png"

interface Props {
  restaurant: Restaurant
  isPopup?: boolean
  isFavoriteRestaurant?: boolean
  isActive?: boolean
  setFavoriteRestaurantIds?: Dispatch<SetStateAction<string[]>>
  setActiveRestaurantId?: Dispatch<SetStateAction<string>>
}

const RestaurantItem = ({
  restaurant,
  isFavoriteRestaurant,
  isActive,
  isPopup = false,
  setFavoriteRestaurantIds,
  setActiveRestaurantId,
}: Props) => {
  const {
    name,
    rating,
    user_ratings_total,
    price_level,
    place_id,
    photos,
    website,
  } = restaurant

  // Use the first restaurant photo as main photo (if it exists)
  let restaurantImageSrc
  if (photos?.length) {
    restaurantImageSrc = photos[0].getUrl()
  }

  const handleContainerClicked = event => {
    // Open the restaurant website if the favorite icon was not clicked.
    if (!event.target.classList.contains("favorite")) {
      window.open(website, "_blank")
    }
  }

  const handleMouseEnter = () => {
    setActiveRestaurantId(place_id)
  }

  const handleMouseLeave = () => {
    setActiveRestaurantId(null)
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
      onClick={handleContainerClicked}
      {...containerListeners}
    >
      <InnerContainer>
        <div>
          <RestaurantImage
            src={restaurantImageSrc}
            alt={`restaurant ${name}`}
          />
        </div>
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
            className="favorite"
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
