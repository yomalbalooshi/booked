import { useState, createContext } from 'react'

const BookingContext = createContext(0)

export const BookingProvider = ({ children }) => {
  const [bookingUpdate, setBookingUpdate] = useState(0)

  const updateBooking = () => {
    setBookingUpdate((prev) => prev + 1)
  }
  return (
    <BookingContext.Provider value={{ bookingUpdate, updateBooking }}>
      {children}
    </BookingContext.Provider>
  )
}
export default BookingContext
