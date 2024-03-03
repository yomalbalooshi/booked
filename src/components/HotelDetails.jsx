import { useParams } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { useEffect, useState } from 'react'

const HotelDetails = () => {
  let { id } = useParams()
  let [hotel, setHotel] = useState({})

  useEffect(() => {
    const getHotelDetails = async () => {
      let response = await ShowHotel(id)
      setHotel(response)
    }
    getHotelDetails()
  }, [])

  console.log(hotel)
  return (
    <div>
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
              <p>{review.feedback}</p>
              <p>{review.creationDate}</p>
              <p>{review.rating}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HotelDetails
