import * as React from "react"
import { Place } from "../../shared-types"
import { ListContainer } from "./style"

const List = ({ places }: { places: Place[] }) => {
  return (
    <ListContainer>
      {places.map((place) => (
        <p>Place</p>
      ))}
    </ListContainer>
  )
}

export default List
