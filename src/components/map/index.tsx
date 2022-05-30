import * as React from "react"
import { Place } from "../../shared-types"
import { MapOuterContainer, MapContainer } from "./styles"

const Map = ({ places }: { places: Place[] }) => {
  return (
    <>
      <MapOuterContainer>
        <MapContainer id="map">Map</MapContainer>
      </MapOuterContainer>
    </>
  )
}

export default Map
