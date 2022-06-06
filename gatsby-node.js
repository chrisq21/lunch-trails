// Common.js imports are needed here since gatsby-node.js runs in node.js.
const fetchPlaces = require("./src/utils/fetchPlaces").default

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // Fetch places
  const places = await fetchPlaces()

  places.forEach(place => {
    console.log('place -> ', place.website)
    createNode({
      ...place,
      id: createNodeId(`place-${place.place_id}`),
      parent: null,
      children: [],
      internal: {
        type: `Place`,
        content: JSON.stringify(place),
        contentDigest: createContentDigest(places),
      },
    })
  })
}
