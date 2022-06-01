import styled from "@emotion/styled"
import searchIconSrc from "../../assets/images/search.png"
import { mobileBreakpoint } from "../../consts/breakpoints"
import { green } from "../../styles/colors"
import {
  inputStyles,
  boldTextStyles,
  defaultTextStyles,
} from "../../styles/shared"

export const HeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2.5rem;
  box-shadow: 0px 2px 4px rgba(0, 2, 4, 0.2);

  @media only screen and (max-width: ${mobileBreakpoint}px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const LogoImg = styled.img`
  height: 4rem;

  @media only screen and (max-width: ${mobileBreakpoint}px) {
    height: 3rem;
  }
`
export const InputsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 500px;

  @media only screen and (max-width: ${mobileBreakpoint}px) {
    max-width: none;
    width: 100%;
    margin: 0.5rem 0;
  }
`

export const SearchBar = styled.input`
  ${inputStyles};
  ${boldTextStyles};

  ::placeholder {
    ${boldTextStyles};
    opacity: 1; /* Firefox */
  }

  width: 100%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

  // Search icon
  background-color: none;
  background: url(${searchIconSrc}) center right no-repeat;
  background-size: 2.5rem auto;
  outline: none;
`

export const SortButton = styled.button<{ isActive: boolean }>`
  ${inputStyles};
  ${defaultTextStyles};

  height: 100%;
  cursor: pointer;
  margin: 0px 1rem;

  ${({ isActive }) =>
    isActive &&
    `
    background: ${green};
    color: white;
  `}

  @media only screen and (max-width: ${mobileBreakpoint}px) {
    margin-left: 0;
  }
`

export const SortButtonContainer = styled.div`
  position: relative;
`

export const ModalBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
`
