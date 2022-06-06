const axios = require("axios").default

async function fetchPlaces() {
  let placesWithDetails = []
  try {
    const mapConfig = {
      radius: 1500,
      location: `37.7749%2C-122.4194`, // SF
      key: process.env.PLACES_API_KEY,
      type: "restaurant",
    }

    const { radius, type, location, key } = mapConfig
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=${radius}&type=${type}&location=${location}&key=${key}`
    )

    if (response?.data?.status === "OK") {
      const places = response.data.results

      const placesSubarray = places.slice(0, 9)
      for (const place of placesSubarray) {
        const { place_id } = place
        const detailsResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${key}&fields=website`
        )
        const { website } = detailsResponse?.data?.result
        placesWithDetails.push({ ...place, website })
      }
    }
  } catch (error) {
    // Report error
  }

  return placesWithDetails
}

// Common.js export are needed here since gatsby-node.js runs in node.js.
exports.default = fetchPlaces
