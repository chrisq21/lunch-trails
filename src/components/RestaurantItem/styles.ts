import styled from "@emotion/styled"
import { borderGray, green } from "../../styles/colors"
import { boldTextStyles, lightTextStyles } from "../../styles/shared"

export const ItemContainer = styled.a<{
  isActive: boolean
  isPopup: boolean
}>`
  position: relative;
  display: flex;
  border-radius: 8px;
  background: white;
  margin-bottom: ${({ isPopup }) => (isPopup ? 0 : "0.75rem")};
  padding: 1rem;
  justify-content: space-between;
  border: 1px solid ${borderGray};
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    `
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid ${green};
      border-radius: 8px;
      pointer-events: none
    }
  `}
`

export const RestaurantImage = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
`

export const InnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1.25rem;
`

export const Title = styled.span`
  ${boldTextStyles}
  font-size: 1rem;
`

export const Text = styled.span`
  ${lightTextStyles}
  font-size: 0.8rem;
`

export const StarsContainer = styled.div`
  display: flex;
  margin: 5px 0;
`

export const StarImg = styled.img`
  margin-right: 5px;
`

export const HeartImg = styled.img`
  cursor: pointer;
`
