import { SortOptions } from "../../../consts/sortOptions"

// TODO write test (maybe do sorting in page component?)
const getSortedRestaurants = (restaurants, sortOrder) => {
  const restaurantsCopy = [...restaurants]
  return restaurantsCopy.sort((restaurantA, restaurantB) => {
    if (sortOrder === SortOptions.Ascending) {
      return restaurantA.rating - restaurantB.rating
    }
    return restaurantB.rating - restaurantA.rating
  })
}

export default getSortedRestaurants
