import React, { useState } from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import RestaurantList from "../components/RestaurantList"
import Map from "../components/Map"
import { Restaurant } from "../shared-types"
import { GridContainer } from "./styles"

const IndexPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  return (
    <Layout>
      <GridContainer>
        <Header />
        <RestaurantList restaurants={restaurants} />
        <Map restaurants={restaurants} setRestaurants={setRestaurants} />
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
