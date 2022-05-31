import styled from "styled-components"
import searchIconSrc from '../../assets/images/search.png'
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
`

export const LogoImg = styled.img`
  height: 4rem;
`
export const InputsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 500px;
`

export const SortButton = styled.button`
  ${inputStyles};
  ${defaultTextStyles};

  margin: 0px 1rem;
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
