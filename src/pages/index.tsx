import React, { useEffect, useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
import { Restaurant } from "../types/shared-types"
import { GridContainer, ToggleButton, ToggleButtonContainer } from "./styles"
import { SortOptions } from "../consts/sortOptions"
import listIconSrc from "../assets/images/list-icon.png"
import mapIconSrc from "../assets/images/list-icon.png"

const IndexPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOptions>(
    SortOptions.Descending
  )
  const [shouldShowList, setShouldShowList] = useState<boolean>(true)

  return (
    <Layout>
      <GridContainer shouldShowList={shouldShowList}>
        <Header
          setSearchQuery={setSearchQuery}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
        />
        <RestaurantList restaurants={restaurants} sortOrder={sortOrder} />
        <Map
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          searchQuery={searchQuery}
        />
        <ToggleButtonContainer>
          <ToggleButton shouldShowMapImg={shouldShowList} onClick={() => setShouldShowList(!shouldShowList)}>
            {/* <img
              src={shouldShowList ? listIconSrc : mapIconSrc}
              alt={shouldShowList ? "Map" : "List"}
            /> */}
            {shouldShowList ? "Map" : "List"}
          </ToggleButton>
        </ToggleButtonContainer>
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
