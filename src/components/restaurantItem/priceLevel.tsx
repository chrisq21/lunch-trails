import React from "react"
import { Text } from "./styles"
import { v4 as uuidv4 } from "uuid"

const PriceLevel = ({ numDollarSigns }: { numDollarSigns: number }) => {
  const dollarSigns = new Array(numDollarSigns)
    .fill("$")
    .map((dollarSign, i) => <Text key={uuidv4()}>{dollarSign}</Text>)

  return <>{dollarSigns}</>
}

export default PriceLevel
