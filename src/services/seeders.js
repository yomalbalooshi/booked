import Client from './api'
// import { data } from './Companyseeds.json'
// import { data } from './Customerseeds.json'
// import { data } from './Hotelseeds.json'
// import { data } from './roomseeds.json'
import { data } from './bookingSeeds.json'

// const companies = data.map((item) => ({
//   name: item.name,
//   email: item.email,
//   password: '123'
// }))

// const customers = data.map((item) => ({
//   name: item.name,
//   email: item.email,
//   gender: item.gender,
//   nationality: item.nationality,
//   password: '123'
// }))

// const hotels = data.map((item) => ({
//   name: item.name,
//   description: item.description,
//   companyId: item.companyId,
//   location: item.location,
//   amenities: item.amenities
// }))
// const rooms = data.map((item) => ({
//   roomType: item.roomType,
//   price: item.price,
//   amenities: item.amenities,
//   hotelId: item.hotelId,
//   maxAdults: item.maxAdults,
//   maxChildren: item.maxChildren,
//   images: item.images
// }))
const bookings = data.map((item) => ({
  hotelId: item.hotelId,
  roomType: item.roomType,
  checkIn: item.checkIn,
  checkOut: item.checkOut,
  noOfRooms: item.noOfRooms,
  adults: item.adults,
  children: item.children,
  specialRequest: item.specialRequest,
  lateCheckout: item.lateCheckout,
  earlyCheckIn: item.earlyCheckIn,
  totalCost: item.totalCost,
  extraBed: item.extraBed,
  customerId: item.customerId
}))

export const companyCreation = async () => {
  companies.map(async (item) => {
    try {
      const res = await Client.post('/companyregister', item)
      return res.data
    } catch (error) {
      // throw error
    }
  })
}

export const customerCreation = async () => {
  customers.map(async (item) => {
    try {
      const res = await Client.post('/register', item)
      return res.data
    } catch (error) {
      // throw error
    }
  })
}
export const hotelCreation = async () => {
  hotels.map(async (item) => {
    try {
      const res = await Client.post('/hotels', item)
      return res.data
    } catch (error) {
      // throw error
    }
  })
}
export const roomsCreation = async () => {
  rooms.map(async (item) => {
    try {
      const res = await Client.post('/rooms', item)
      return res.data
    } catch (error) {
      // throw error
    }
  })
}
export const bookingsCreation = async () => {
  bookings.map(async (item) => {
    try {
      const res = await Client.post('/bookings', item)
      return res.data
    } catch (error) {
      // throw error
    }
  })
}
