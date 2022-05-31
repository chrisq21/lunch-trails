import React, { useState } from "react"
import {
  SortModalContainer,
  ApplyButtonContainer,
  ApplyButton,
  RadioLabel,
} from "./styles"
import radioCheckedSrc from "../../../assets/images/radio-checked.png"
import radioUncheckedSrc from "../../../assets/images/radio-unchecked.png"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import { SortOptions } from "../../../consts/sortOptions"

interface Props {
  applySortOrder: (sortOrder: SortOptions) => void
}

const CheckedIcon = () => <img src={radioCheckedSrc} alt="checked" />
const UncheckedIcon = () => <img src={radioUncheckedSrc} alt="un-checked" />

const SortModal = ({ applySortOrder }: Props) => {
  // Modifying localSortOrder is used only to update SortModal's UI.
  const [localSortOrder, setLocalSortOrder] = useState<SortOptions>(
    SortOptions.Descending
  )

  const handleChange = e => {
    setLocalSortOrder(e.target.value)
  }

  return (
    <SortModalContainer>
      <RadioGroup
        onChange={handleChange}
        defaultValue={SortOptions.Descending}
        name="radio-buttons-group"
      >
        <RadioLabel
          value={SortOptions.Descending}
          control={
            <Radio checkedIcon={<CheckedIcon />} icon={<UncheckedIcon />} />
          }
          label="Ratings High to Low"
        />
        <RadioLabel
          value={SortOptions.Ascending}
          control={
            <Radio checkedIcon={<CheckedIcon />} icon={<UncheckedIcon />} />
          }
          label="Ratings Low to High"
        />
      </RadioGroup>
      <ApplyButtonContainer>
        <ApplyButton
          onClick={() => {
            applySortOrder(localSortOrder)
          }}
        >
          Apply
        </ApplyButton>
      </ApplyButtonContainer>
    </SortModalContainer>
  )
}

export default SortModal
