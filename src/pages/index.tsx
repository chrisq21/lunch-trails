import React, { useState } from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import RestaurantList from "../components/restaurantList"
import Map from "../components/map"
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
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const staticContent = data.allPlace.nodes
  // Google Maps Api config
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
  const [searchQuery, setSearchQuery] = useState<string>(null)
  const [shouldShowList, setShouldShowList] = useState<boolean>(true)
  const [sortOrder, setSortOrder] = useState<SortOptions>(
    SortOptions.Descending
  )
  const { google, map, service } = useGoogleMapsApi(
    loaderOptions,
    mapOptions,
    "map"
  )
  const restaurants = usePlacesService(map, service, searchQuery, staticContent)

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

export const query = graphql`
  {
    allPlace {
      nodes {
        name
        place_id
        rating
        user_ratings_total
        photos {
          photo_reference
        }
        price_level
        geometry {
          location {
            lat
            lng
          }
        }
        website
      }
    }
  }
`