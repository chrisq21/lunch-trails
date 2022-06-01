import { SortOptions } from "../../../../consts/sortOptions"

const getSortedRestaurantsByRating = (restaurants, sortOrder) => {
  const restaurantsCopy = [...restaurants]
  return restaurantsCopy.sort((restaurantA, restaurantB) => {
    if (sortOrder === SortOptions.Ascending) {
      return restaurantA.rating - restaurantB.rating
    }
    return restaurantB.rating - restaurantA.rating
  })
}

export default getSortedRestaurantsByRating
