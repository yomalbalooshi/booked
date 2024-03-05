import Client from './api'

export const GetHotels = async () => {
  try {
    const res = await Client.get('/hotels')
    return res.data
  } catch (error) {
    throw error
  }
}

export const ShowHotel = async (id) => {
  try {
    const res = await Client.get(`hotels/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
