import React, { useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
import { Restaurant } from "../types/shared-types"
import { GridContainer, ToggleButton, ToggleButtonContainer } from "../styles/homepageStyles"
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
          setActiveRestaurantId={setActiveRestaurantId}
        />
        <Map
          restaurants={restaurants}
          activeRestaurantId={activeRestaurantId}
          searchQuery={searchQuery}
          setRestaurants={setRestaurants}
          setActiveRestaurantId={setActiveRestaurantId}
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
