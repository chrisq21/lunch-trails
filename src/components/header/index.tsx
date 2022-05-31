import {
  HeaderContainer,
  LogoImg,
  InputsContainer,
  SortButton,
  SearchBar,
  SortButtonContainer,
  ModalBackgroundContainer,
} from "./styles"

import React, { Dispatch, SetStateAction, useState } from "react"
import SortModal from "./sortModal"
import debounce from "lodash.debounce"
import logoSrc from "../../assets/images/logo.png"

interface Props {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShouldSortAscending: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setSearchQuery, setShouldSortAscending }: Props) => {
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  const handleApplySortOrder = (shouldSortAscending: boolean) => {
    setShouldShowModal(false)
    setShouldSortAscending(shouldSortAscending)
  }

  const debouncedHandleSearchChange = React.useMemo(
    () => debounce(handleSearchChange, 500),
    []
  )
  
  
  return (
    <HeaderContainer>
      {shouldShowModal && (
        <ModalBackgroundContainer onClick={() => setShouldShowModal(false)} />
      )}
      <LogoImg src={logoSrc} />
      <InputsContainer>
        <SortButtonContainer>
          {shouldShowModal && (
            <SortModal applySortOrder={handleApplySortOrder} />
          )}
          <SortButton onClick={() => setShouldShowModal(!shouldShowModal)}>
            Sort
          </SortButton>
        </SortButtonContainer>
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
