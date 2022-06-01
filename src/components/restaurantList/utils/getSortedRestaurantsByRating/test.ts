import { SortOptions } from "../../../../consts/sortOptions"
import getSortedRestaurantsByRating from "./index"

const restaurantLowRating = {
  name: "A",
  rating: 1,
}

const restaurantMediumRating = {
  name: "B",
  rating: 2,
}

const restaurantHighRating = {
  name: "C",
  rating: 3,
}

const mockRestaurants = [
  restaurantMediumRating,
  restaurantLowRating,
  restaurantHighRating,
]

describe("getSortedRestaurantsByRating", () => {
  it("sorts restaurants in ascending order", () => {
    const sortedRestaurants = getSortedRestaurantsByRating(
      mockRestaurants,
      SortOptions.Ascending
    )
    const expectedRestaurants = [
      restaurantLowRating,
      restaurantMediumRating,
      restaurantHighRating,
    ]
    expect(sortedRestaurants).toEqual(expectedRestaurants)
  })

  it("sorts restaurants in descending order", () => {
    const sortedRestaurants = getSortedRestaurantsByRating(
      mockRestaurants,
      SortOptions.Descending
    )
    const expectedRestaurants = [
      restaurantHighRating,
      restaurantMediumRating,
      restaurantLowRating,
    ]
    expect(sortedRestaurants).toEqual(expectedRestaurants)
  })
})
