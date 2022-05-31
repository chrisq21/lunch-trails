import React, { Dispatch, SetStateAction, useState } from "react"
import {
  SortModalContainer,
  RadioButtonContainer,
  RadioImg,
  ApplyButtonContainer,
  ApplyButton,
  RadioText,
} from "./styles"
import radioCheckedSrc from "../../../assets/images/radio-checked.png"
import radioUncheckedSrc from "../../../assets/images/radio-unchecked.png"

interface Props {
  applySortOrder: (shouldSortAscending: boolean) => void
}

const SortModal = ({ applySortOrder }: Props) => {
  const [shouldSortAscending, setShouldSortAscending] = useState<boolean>(false)

  return (
    <SortModalContainer role={"radiogroup"}>
      {/* Descending order option */}
      <RadioButtonContainer
        onClick={() => setShouldSortAscending(false)}
        role={"radio"}
        aria-checked={!shouldSortAscending}
      >
        <RadioImg
          src={shouldSortAscending ? radioUncheckedSrc : radioCheckedSrc}
        />
        <RadioText>Ratings High to Low</RadioText>
      </RadioButtonContainer>

      {/* Ascending order option */}
      <RadioButtonContainer
        role={"radio"}
        aria-checked={!!shouldSortAscending}
        onClick={() => setShouldSortAscending(true)}
      >
        <RadioImg
          src={!shouldSortAscending ? radioUncheckedSrc : radioCheckedSrc}
        />
        <RadioText>Ratings Low to High</RadioText>
      </RadioButtonContainer>

      {/* Apply sort button */}
      <ApplyButtonContainer>
        <ApplyButton
          onClick={() => {
            applySortOrder(shouldSortAscending)
          }}
        >
          Apply
        </ApplyButton>
      </ApplyButtonContainer>
    </SortModalContainer>
  )
}

export default SortModal
