import React, { useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import List from "../components/list"
import Map from "../components/map"
import { Restaurant } from "../shared-types"
import { GridContainer } from "./styles"

const IndexPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  return (
    <Layout>
      <GridContainer>
        <Header />
        <List restaurants={restaurants} />
        <Map restaurants={restaurants} setRestaurants={setRestaurants} />
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
