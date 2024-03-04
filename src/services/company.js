import Client from './api'
export const getAllCompanyHotels = async (userId) => {
  console.log(userId)
  try {
    const res = await Client.get(`/hotels/companyprofile/${userId}`)
    return res.data
  } catch (error) {}
}

export const addCompanyHotel = async (data) => {
  try {
    const res = Client.post('/hotels', data)
    console.log(res)
    return res.data
  } catch (error) {}
}

export const addCompanyHotelRoom = async (data) => {
  try {
    const res = Client.post('/rooms', data)
    console.log(res)
    return res.data
  } catch (error) {}
}
export const deleteHotel = async (id) => {
  try {
    const res = await Client.delete(`/hotels/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const UpdateCompanyHotel = async (data) => {
  try {
    const { id, amenities, ...restData } = data
    const res = await Client.put(`/hotels/${id}`, {
      ...restData,
      amenities: amenities.filter((amenity) => amenity.trim() !== '')
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
