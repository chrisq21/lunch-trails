import { HeaderContainer, LogoImg, InputsContainer, SortButton, SearchBar } from "./styles"
import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import logoSrc from '../../assets/images/logo.png'
interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<String[]>>
}

const Header = ({
  searchQuery,
  setSearchQuery,
}: Props) => (
  <HeaderContainer>
    <LogoImg src={logoSrc} />
    <InputsContainer>
      <SortButton>Sort</SortButton>
      <SearchBar type={"text"} placeholder="Search for a restaurant" onChange={() => {}} />
    </InputsContainer>
  </HeaderContainer>
)

export default Header