import Client from './api'
export const addHotelReview = async (hotelId, data) => {
  try {
    const res = await Client.post(`/hotels/${hotelId}/reviews`, data)
    console.log(res)
    return res.data
  } catch (error) {}
}

export const deleteHotelReview = async (data) => {
  try {
    const res = await Client.delete(`/reviews/${data.reviewId}`, { data })
    console.log(res)
    return res.data
  } catch (error) {}
}
