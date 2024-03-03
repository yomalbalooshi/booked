import Client from './api'
export const getAllCutomerBookings = async (userId) => {
  try {
    const res = await Client.get(`/bookings/customer/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addCustomerBooking = async (data) => {
  try {
    const res = Client.post('/bookings', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteBooking = async (data) => {
  try {
    const res = await Client.delete(`/bookings/${data.bookingId}`, { data })
    return res.data
  } catch (error) {
    throw error
  }
}

export const ShowBooking = async (id) => {
  try {
    const res = await Client.get(`bookings/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateCustomerBooking = async (data) => {
  try {
    const res = await Client.put(`/bookings/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
