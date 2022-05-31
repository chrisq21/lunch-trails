import React, { useEffect, useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
import { Restaurant } from "../types/shared-types"
import { GridContainer, ToggleButton, ToggleButtonContainer } from "./styles"
import { SortOptions } from "../consts/sortOptions"

const IndexPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOptions>(
    SortOptions.Descending
  )
  const [shouldShowList, setShouldShowList] = useState<boolean>(true)
  const [activeRestaurantId, setActiveRestaurantId] = useState<string>(null)

  return (
    <Layout>
      <GridContainer shouldShowList={shouldShowList}>
        <Header
          setSearchQuery={setSearchQuery}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
        />
        <RestaurantList
          restaurants={restaurants}
          sortOrder={sortOrder}
          activeRestaurantId={activeRestaurantId}
        />
        <Map
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          setActiveRestaurantId={setActiveRestaurantId}
          searchQuery={searchQuery}
          activeRestaurantId={activeRestaurantId}
        />
        <ToggleButtonContainer>
          <ToggleButton
            shouldShowMapImg={shouldShowList}
            onClick={() => setShouldShowList(!shouldShowList)}
          >
            {shouldShowList ? "Map" : "List"}
          </ToggleButton>
        </ToggleButtonContainer>
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
