import { useParams, useNavigate } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { getAllCutomerBookings } from '../services/booking'
import { deleteHotelReview } from '../services/reviews'
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

  const isUserReview = (reviewCustomerId) => {
    return user.id === reviewCustomerId
  }

  const deleteReview = (reviewId) => {
    console.log(`Deleting review ${reviewId} ...`)
    const deleteReview = async (hotelId, data) => {
      await deleteHotelReview(hotelId, reviewId)
      updateReviewsCallback()
    }

    deleteReview(hotel._id, reviewId)
    // setFormState(initialState)
  }

  const userHasBookings = () => {
    if (customerBookings) {
      for (let i = 0; i < customerBookings.length; i++) {
        if (customerBookings[i].hotelId._id === hotel._id) {
          console.log(
            'checkIn Date : ',
            customerBookings[i].checkIn,
            ', checkOut',
            customerBookings[i].checkOut,
            ' ,now: ',
            Date.now
          )
          const checkIn = new Date(customerBookings[i].checkIn).getTime()
          const checkOut = new Date(customerBookings[i].checkOut).getTime()
          const now = Date.now()
          console.log(
            'checkIn : ',
            checkIn,
            ', checkOut',
            checkOut,
            ' ,now: ',
            now
          )

          if (checkIn < now || checkOut < now) {
            return true
          }
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
    Object.keys(hotel).length !== 0 && (
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
                {isUserReview(review.customerId) && (
                  <button onClick={() => deleteReview(review._id)}>X</button>
                )}
              </div>
            ))}
        </div>
        {userHasBookings() && (
          <ReviewForm
            user={user}
            hotelId={id}
            callback={updateReviewsCallback}
          />
        )}
        <div id="book">
          <button onClick={() => navigate(`/booking/${hotel._id}`)}>
            Booking
          </button>
        </div>
      </div>
    )
  )
}

export default HotelDetails
