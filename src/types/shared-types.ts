interface Photo {
  getUrl: () => string
}

export interface Restaurant {
  name: string
  place_id: string
  rating: number
  user_ratings_total: number
  price_level: number
  photos: Photo[]
  website: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}
