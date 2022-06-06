import React, { useEffect, useState } from "react"
import createPopupClass from "../components/map/createPopupClass"
import { PopupType } from "../types/shared-types"

const usePopup = (google, map, contentElementId) => {
  const [popup, setPopup] = useState<PopupType>()
  const [shouldShowPopup, setShouldShowPopup] = useState(false)

  useEffect(() => {
    let mapClickListener
    if (google && map) {
      const PopupClass = createPopupClass(google)
      const popInstance = new PopupClass(
        map.getCenter(),
        document.getElementById(contentElementId)
      )
      popInstance.setMap(map)

      mapClickListener = map.addListener("click", () => {
        setShouldShowPopup(false)
      })

      setPopup(popInstance)
    }

    return () => {
      if (google) {
        google.maps.event.removeListener(mapClickListener)
      }
    }
  }, [google, map])

  useEffect(() => {
    if (popup) {
      if (shouldShowPopup) {
        popup.setMap(map)
      } else {
        popup.setMap(null)
      }
    }
  }, [popup, shouldShowPopup])

  return popup
}

export default usePopup
