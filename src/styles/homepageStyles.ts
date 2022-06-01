import styled from "@emotion/styled"
import { mobileBreakpoint, mediumDesktop } from "../consts/breakpoints"
import { green } from "./colors"
import { inputStyles } from "./shared"

import listIconSrc from "../assets/images/list-icon.png"
import mapIconSrc from "../assets/images/map-icon.png"

export const GridContainer = styled.div<{ shouldShowList: boolean }>`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    "header header"
    "list map";
  grid-template-rows: 5rem auto;
  grid-template-columns: 33% auto;

  @media only screen and (max-width: ${mediumDesktop}px) {
    & {
      grid-template-columns: 40% auto;
    }
  }

  // On mobile, modify the 2nd row's column sizes such that
  // either the list or map area takes up 100% of the content below the header.
  @media only screen and (max-width: ${mobileBreakpoint}px) {
    & {
      grid-template-rows: 8rem auto;
      ${({ shouldShowList }) =>
        shouldShowList
          ? `grid-template-columns: 100% 0;`
          : `grid-template-columns: 0 100%;`}
    }
  }
`

export const ToggleButtonContainer = styled.div`
  display: none;

  @media only screen and (max-width: ${mobileBreakpoint}px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 50px;
    width: 100%;
    z-index: 2;
  }
`

export const ToggleButton = styled.button<{ shouldShowMapImg: boolean }>`
  ${inputStyles};
  background-color: ${green};
  border-color: ${green};
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  padding-left: 2.5rem;
  text-align: center;

  background-image: ${({ shouldShowMapImg }) =>
    `url(${shouldShowMapImg ? mapIconSrc : listIconSrc})`};
  background-position: 20% center;
  background-repeat: no-repeat;
  background-size: 1.75rem auto;
`
