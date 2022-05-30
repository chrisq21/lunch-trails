import * as React from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import List from "../components/list"
import Map from "../components/map"
import { GridContainer } from "./styles"

const IndexPage = () => (
  <Layout>
    <GridContainer>
      <Header />
      <List />
      <Map />
    </GridContainer>
  </Layout>
)

export default IndexPage
