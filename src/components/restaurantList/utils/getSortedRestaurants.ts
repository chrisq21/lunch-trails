// TODO write test (maybe do sorting in page component?)
const getSortedRestaurants = (restaurants, shouldSortAscending) => {
  const restaurantsCopy = [...restaurants]
  return restaurantsCopy.sort((restaurantA, restaurantB) => {
    if (shouldSortAscending) {
      return restaurantA.rating - restaurantB.rating
    }
    return restaurantB.rating - restaurantA.rating
  })
}

export default getSortedRestaurants
