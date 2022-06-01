import { favoritesLocalStorageKey } from "../../consts/favorites"

export const getFavoritesFromLocalStorage = () => {
  let favoriteRestaurantIds = []
  try {
    const favoriteRestaurantIdsStr = localStorage.getItem(
      favoritesLocalStorageKey
    )
    if (favoriteRestaurantIdsStr) {
      // Get favorites from local storage.
      favoriteRestaurantIds = JSON.parse(favoriteRestaurantIdsStr)

      if (!Array.isArray(favoriteRestaurantIds)) {
        // Reset favorites if data structure is not an array.
        localStorage.setItem("favoriteRestaurantIds", JSON.stringify([]))
        favoriteRestaurantIds = []
        throw new Error(
          "Incorrect data structure found when attempting to get favoriteRestaurantIds from local storage."
        )
      }
    }

    return favoriteRestaurantIds
  } catch (error) {
    // Send bug to monitoring tool
  }
}

const setFavoritesToLocalStorage = (favoriteRestaurantIds: string[]) => {
  try {
    if (!Array.isArray(favoriteRestaurantIds)) {
      throw new Error(
        "Incorrect data structure found when attempting to set favoriteRestaurantIds to local storage."
      )
    }
    // Update favoriteRestaurantIds in local storage.
    localStorage.setItem(
      favoritesLocalStorageKey,
      JSON.stringify(favoriteRestaurantIds)
    )
  } catch (error) {
    // Send bug to monitoring tool
  }
}

export const addFavoriteRestaurantIdToLocalStorage = (restaurantId: string) => {
  let favoriteRestaurantIds = getFavoritesFromLocalStorage()

  // Add favorite restaurant id to array.
  favoriteRestaurantIds.push(restaurantId)
  setFavoritesToLocalStorage(favoriteRestaurantIds)

  return favoriteRestaurantIds
}

export const removeFavoriteRestaurantIdFromLocalStorage = restaurantId => {
  let favoriteRestaurantIds = getFavoritesFromLocalStorage()

  // remove existing restaurant id from favoriteRestaurantIds array.
  favoriteRestaurantIds = favoriteRestaurantIds.filter(
    existingPlaceId => existingPlaceId !== restaurantId
  )
  setFavoritesToLocalStorage(favoriteRestaurantIds)

  return favoriteRestaurantIds
}
