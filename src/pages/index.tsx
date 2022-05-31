import React, { useEffect, useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
import { Restaurant } from "../types/shared-types"
import { GridContainer } from "./styles"

const IndexPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <Layout>
      <GridContainer>
        <Header setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <RestaurantList restaurants={restaurants} />
        <Map restaurants={restaurants} setRestaurants={setRestaurants} searchQuery={searchQuery} />
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
