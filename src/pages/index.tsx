import * as React from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import List from "../components/list"
import Map from "../components/map"
import { GridContainer } from "./styles"

const IndexPage = () => {
  const [places, setPlaces] = React.useState([])

  return (
    <Layout>
      <GridContainer>
        <Header />
        <List places={places} />
        <Map places={places} setPlaces={setPlaces} />
      </GridContainer>
    </Layout>
  )
}

export default IndexPage
