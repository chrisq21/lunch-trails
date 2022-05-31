import {
  HeaderContainer,
  LogoImg,
  InputsContainer,
  SortButton,
  SearchBar,
} from "./styles"
import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react"
import logoSrc from "../../assets/images/logo.png"
import debounce from "lodash.debounce"

interface Props {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const Header = ({ searchQuery, setSearchQuery }: Props) => {
  
  const handleSearchChange = event => {
    if (event.target.value) {
      setSearchQuery(event.target.value)
    }
  }

  const debouncedHandleSearchChange = React.useMemo(
    () => debounce(handleSearchChange, 500),
    []
  )

  return (
    <HeaderContainer>
      <LogoImg src={logoSrc} />
      <InputsContainer>
        <SortButton>Sort</SortButton>
        <SearchBar
          type={"text"}
          placeholder="Search for a restaurant"
          onChange={debouncedHandleSearchChange}
        />
      </InputsContainer>
    </HeaderContainer>
  )
}

export default Header
