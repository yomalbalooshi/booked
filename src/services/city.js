import Client from './api'

export const GetCities = async () => {
  try {
    const res = await Client.get('/city')
    return res.data
  } catch (error) {
    throw error
  }
}

export const ShowCity = async (id) => {
  try {
    const res = await Client.get(`city/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
