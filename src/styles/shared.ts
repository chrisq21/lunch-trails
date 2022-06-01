import { css } from "styled-components"
import { borderGray, gray, lightGray } from "./colors"

export const lightTextStyles = css`
  font-family: "Proxima Nova Regular";
  color: ${lightGray};
`

export const defaultTextStyles = css`
  font-family: "Proxima Nova Regular";
  color: ${gray};
`

export const boldTextStyles = css`
  font-family: "Proxima Nova Bold";
  color: ${gray};
`

export const inputStyles = css`
  border: 1px solid ${borderGray};
  border-radius: 6px;
  background: white;
  padding: 0.55rem 1rem;
  font-size: 1rem;
`
