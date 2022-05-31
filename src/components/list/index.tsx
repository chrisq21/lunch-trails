import * as React from "react"
import { Restaurant } from "../../shared-types"
import { ListContainer } from "./style"
import { v4 as uuidv4 } from 'uuid';

const List = ({ restaurants }: { restaurants: Restaurant[] }) => {
  return (
    <ListContainer>
      {restaurants.map(({ name }) => (
        <div key={uuidv4()}>
        <p>{name}</p>
        </div>
      ))}
    </ListContainer>
  )
}

export default List
