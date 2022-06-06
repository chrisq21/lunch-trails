import React, { useEffect, useState } from "react"
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader"

const useGoogleMapsApi = (
  loaderOptions: LoaderOptions,
  mapOptions: google.maps.MapOptions,
  mapElementId: string
) => {
  const [googleMapsApiData, setGoogleMapsApiData] = useState({
    google: null,
    map: null,
    service: null
  })

  useEffect(() => {
    const init = async () => {
      const loader = new Loader(loaderOptions)
      const google = await loader.load()

      const map = new google.maps.Map(
        document.getElementById(mapElementId),
        mapOptions
      )

      const service = new google.maps.places.PlacesService(map)

      setGoogleMapsApiData({ google, map, service })
    }

    init()
  }, [])

  return googleMapsApiData
}

export default useGoogleMapsApi
