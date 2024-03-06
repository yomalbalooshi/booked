import Client from './api'
export const addHotelReview = async (hotelId, data) => {
  try {
    const res = await Client.post(`/hotels/${hotelId}/reviews`, data)

    return res.data
  } catch (error) {}
}

export const deleteHotelReview = async (data) => {
  try {
    const res = await Client.delete(`/reviews/${data.reviewId}`, { data })

    return res.data
  } catch (error) {}
}
