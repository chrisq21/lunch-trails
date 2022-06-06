import React, { useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
import { Restaurant } from "../types/shared-types"
import {
  GridContainer,
  ToggleButton,
  ToggleButtonContainer,
} from "../styles/homepageStyles"
import { SortOptions } from "../consts/sortOptions"

import { LoaderOptions } from "@googlemaps/js-api-loader"
import useGoogleMapsApi from "../hooks/useGoogleMapsApi"
import usePlacesService from "../hooks/usePlacesService"
import { SFCoordinates } from "../consts/map"

const IndexPage = () => {
  // Google Maps Api variables
  const loaderOptions: LoaderOptions = {
    apiKey: process.env.GATSBY_PLACES_API_KEY || process.env.PLACES_API_KEY,
    libraries: ["places"],
  }
  const mapOptions: google.maps.MapOptions = {
    center: { lat: SFCoordinates.lat, lng: SFCoordinates.lng },
    zoom: 15,
    disableDefaultUI: true,
  }

  // App state
  const [activeRestaurantId, setActiveRestaurantId] = useState<string>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [shouldShowList, setShouldShowList] = useState<boolean>(true)
  const [sortOrder, setSortOrder] = useState<SortOptions>(
    SortOptions.Descending
  )
  const { google, map, service } = useGoogleMapsApi(
    loaderOptions,
    mapOptions,
    "map"
  )
  const restaurants = usePlacesService(map, service, searchQuery)

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
          google={google}
          map={map}
          service={service}
          restaurants={restaurants}
          activeRestaurantId={activeRestaurantId}
          searchQuery={searchQuery}
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
