import { useNavigate } from 'react-router-dom'
import { getAllCutomerBookings, deleteBooking } from '../services/booking'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
const Profile = ({ user }) => {
  const navigate = useNavigate()

  const [customerBookings, setCustomerBookings] = useState([])
  console.log(user)
  useEffect(() => {
    const getCustomerBookings = async () => {
      const data = await getAllCutomerBookings(user.id)

      setCustomerBookings(data)
    }
    getCustomerBookings()
  }, [user])

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
        <button
          onClick={() => {
            navigate('/updateprofile')
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  )
}
export default Profile
