import React from "react"
import { v4 as uuidv4 } from "uuid"
import starDefaultSrc from "../../assets/images/star.png"
import starActiveSrc from "../../assets/images/star-active.png"
import { StarImg } from "./styles"

const StarRating = ({ numActiveStars }: { numActiveStars: number }) => {
  let stars = []
  for (let i = 0; i < 5; i++) {
    const isActiveStar = i < Math.floor(numActiveStars)
    const starSrc = isActiveStar ? starActiveSrc : starDefaultSrc
    stars.push(<StarImg key={uuidv4()} src={starSrc} alt="star" />)
  }
  return <>{stars}</>
}

export default StarRating
