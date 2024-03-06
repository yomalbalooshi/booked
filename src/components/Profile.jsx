import { useNavigate } from 'react-router-dom'
import { getAllCutomerBookings, deleteBooking } from '../services/booking'
import { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button'
import BookingContext from '../context/BookingContext'

import dayjs from 'dayjs'
const Profile = ({ user }) => {
  const { bookingUpdate } = useContext(BookingContext)

  console.log(bookingUpdate)

  const navigate = useNavigate()

  const [customerBookings, setCustomerBookings] = useState([])
  console.log(user)

  useEffect(() => {
    const getCustomerBookings = async () => {
      const data = await getAllCutomerBookings(user.id)

      setCustomerBookings(data)
    }
    getCustomerBookings()
  }, [user, bookingUpdate])

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking({ userId: user.id, bookingId })

      const updatedBookings = customerBookings.filter(
        (booking) => booking._id !== bookingId
      )
      setCustomerBookings(updatedBookings)
    } catch (error) {
      throw error
    }
  }

  console.log(customerBookings)
  return (
    user &&
    user.type === 'customer' && (
      <div>
        <div>
          {customerBookings.length > 0 &&
            customerBookings.map((booking) => (
              <div key={booking._id}>
                <p>Check In: {dayjs(booking.checkIn).format('DD/MM/YYYY')}</p>
                <p>Check Out: {dayjs(booking.checkOut).format('DD/MM/YYYY')}</p>
                <p>Adults: {booking.adults}</p>
                <p>Children: {booking.children}</p>
                <p>Early Check In: {booking.earlyCheckIn ? 'Yes' : ' No'}</p>
                <p>Late Check Out: {booking.lateCheckout ? 'Yes' : ' No'}</p>
                <p>Extra Bed: {booking.extraBed ? 'Yes' : ' No'}</p>
                <p>Hotel: {booking.hotelId.name}</p>
                <p>Room Type: {booking.roomType.roomType}</p>
                <p>No of Rooms: {booking.noOfRooms}</p>
                <p>Special Request: {booking.specialRequest}</p>
                <p>Total Cost: {booking.totalCost} $</p>
                <button
                  onClick={() => {
                    handleDeleteBooking(booking._id)
                  }}
                >
                  Cancel Booking
                </button>
                <button
                  onClick={() => {
                    navigate(`/updatebooking/${booking._id}`)
                  }}
                >
                  Update Booking
                </button>
              </div>
            ))}
        </div>
        <div>
          <div style={{ textAlign: 'center', marginTop: 15 }}>
            <Button
              onClick={() => {
                navigate('/updateprofile')
              }}
              variant="contained"
              color="success"
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
export default Profile
