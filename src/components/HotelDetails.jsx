import { useParams, useNavigate } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { getAllCutomerBookings } from '../services/booking'
import { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'

const HotelDetails = ({ user }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  let [hotel, setHotel] = useState({})
  let [updateReviews, setUpdateReviews] = useState(true)
  const [customerBookings, setCustomerBookings] = useState([])

  const updateReviewsCallback = () => {
    setUpdateReviews(!updateReviews)
  }

  const userHasBookings = () => {
    if (customerBookings) {
      for (let i = 0; i < customerBookings.length; i++) {
        if (customerBookings[i].hotelId._id === hotel._id) {
          return true
        }
      }
      return false
    }
    return false
  }

  useEffect(() => {
    const getHotelDetails = async () => {
      // console.log('feching hotel data ..')

      const response = await ShowHotel(id)
      setHotel(response)
    }
    getHotelDetails()
  }, [updateReviews])

  useEffect(() => {
    const getCustomerBookings = async () => {
      console.log('HotelDetails user ==> ', user)
      const data = user ? await getAllCutomerBookings(user.id) : null

      setCustomerBookings(data)
    }
    getCustomerBookings()
  }, [user])

  return (
    <div>
      {console.log('hotel details : ', hotel)}
      {console.log('bookings details : ', customerBookings)}
      {console.log('customer has bookings : ', userHasBookings())}
      <div id="hotel-details">
        <h1>{hotel.name}</h1>
        <p>{hotel.description}</p>
        <p>
          {hotel.city}, {hotel.country}
        </p>
        <img src={hotel.image} alt={hotel.name}></img>
        <h5>Amenities</h5>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <ul>
            {hotel.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        )}
      </div>
      <div id="rooms">
        <h2>Rooms</h2>
        {hotel.rooms &&
          hotel.rooms.length > 0 &&
          hotel.rooms.map((room) => (
            <div id="room" key={room._id}>
              <p>Room Type: {room.roomType}</p>
              <p>Max Guests: {room.maxGuests}</p>
              <p>Price: {room.price} $</p>
              <h5>Amenities</h5>
              {room.amenities && room.amenities.length > 0 && (
                <ul>
                  {room.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              )}
              {room.images && room.images.length > 0 && (
                <div>
                  {room.images.map((image, index) => (
                    <img key={index} src={image}></img>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      <div id="reviews">
        <h2>Reviews</h2>
        {hotel.reviews &&
          hotel.reviews.length > 0 &&
          hotel.reviews.map((review) => (
            <div key={review._id}>
              <p>By:&nbsp;{review.customer[0].email}</p>
              <p>Details:&nbsp;{review.feedback}</p>
              <p>Date:&nbsp;{review.createdAt}</p>
              <p>Rating:&nbsp;{review.rating}</p>
            </div>
          ))}
      </div>
      {userHasBookings() && (
        <ReviewForm user={user} hotelId={id} callback={updateReviewsCallback} />
      )}
      <div id="book">
        <button onClick={() => navigate(`/booking/${hotel._id}`)}>
          Booking
        </button>
      </div>
    </div>
  )
}

export default HotelDetails
