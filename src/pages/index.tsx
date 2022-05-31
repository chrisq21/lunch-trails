import React, { useEffect, useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
import { Restaurant } from "../types/shared-types"
import { GridContainer } from "./styles"
import { SortOptions } from "../consts/sortOptions"

const IndexPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOptions>(SortOptions.Descending)

  return (
    <Layout>
      <GridContainer>
        <Header setSearchQuery={setSearchQuery} setSortOrder={setSortOrder} />
        <RestaurantList restaurants={restaurants} sortOrder={sortOrder} />
        <Map
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          searchQuery={searchQuery}
        />
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
