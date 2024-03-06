import Axios from 'axios'

export const getNearbyRestaurants = async (city) => {
  try {
    const res = await Axios.get(
      `https://hungrylink-backend.fly.dev/api/restsByLocation/${city}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
