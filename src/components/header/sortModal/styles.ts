import { css } from "@emotion/react"
import styled from "styled-components"
import { green } from "../../../styles/colors"
import {
  inputStyles,
  boldTextStyles,
  lightTextStyles,
} from "../../../styles/shared"
import FormControlLabel from "@mui/material/FormControlLabel"

export const SortModalContainer = styled.div`
  ${inputStyles};
  position: absolute;
  width: 200px;
  padding: 0.8rem;
  top: 120%;
  z-index: 3;
  box-shadow: 0px 2px 4px rgba(0, 2, 4, 0.2);
  right: 0px;
`
export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
`

export const RadioImg = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 0.5rem;
`

export const RadioLabel = styled(FormControlLabel)`
  ${lightTextStyles};

  // icon image
  img {
    height: 20px;
    width: 20px;
  }

  // label text
  span {
    font-size: 0.8rem;
  }
`

export const ApplyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`

export const ApplyButton = styled.span`
  ${boldTextStyles};
  color: ${green};
  font-size: 0.8rem;
  cursor: pointer;
`

export const labelStyles = css`
  color: green;
`
