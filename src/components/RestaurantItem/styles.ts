import styled from "styled-components"
import { borderGray } from "../../styles/colors"
import { boldTextStyles, lightTextStyles } from "../../styles/shared"

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  border-radius: 8px;
  background: white;
  margin-bottom: 0.75rem;
  padding: 1rem;
  justify-content: space-between;
  border: 1px solid ${borderGray};
`

export const InnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2rem;
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
  margin: 5px 0;
`

export const StarImg = styled.img`
  margin-right: 5px;
`
