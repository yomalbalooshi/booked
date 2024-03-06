import Client from './api'
export const getAllCompanyHotels = async (userId) => {
  try {
    const res = await Client.get(`/hotels/companyprofile/${userId}`)
    return res.data
  } catch (error) {}
}

export const addCompanyHotel = async (data) => {
  try {
    const res = Client.post('/hotels', data)

    return res.data
  } catch (error) {}
}

export const addCompanyHotelRoom = async (data) => {
  try {
    const res = Client.post('/rooms', data)

    return res.data
  } catch (error) {}
}
export const deleteHotel = async (id) => {
  try {
    const res = await Client.delete(`/hotels/${id}`)
    return res.data
  } catch (error) {
    throw error
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
export const UpdateCompanyHotelRoom = async (data) => {
  try {
    const { id, amenities, ...restData } = data
    const res = await Client.put(`/rooms/${id}`, {
      ...restData,
      amenities: amenities.filter((amenity) => amenity.trim() !== '')
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const ShowRoom = async (id) => {
  try {
    const res = await Client.get(`/rooms/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
