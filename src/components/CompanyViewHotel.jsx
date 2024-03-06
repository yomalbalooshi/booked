import { useParams, useNavigate } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { useEffect, useState } from 'react'

const CompanyViewHotel = ({ user }) => {
  let navigate = useNavigate()
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

  const handleUpdateRoom = async (e, room) => {
    navigate(`../updateroom/${room._id}`)
  }
  return (
    user &&
    user.type === 'company' && (
      <div>
        <button
          onClick={() => {
            navigate('../companyprofile')
          }}
        >
          Back to Profile
        </button>
        <h1>Hotel Info</h1>
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
          <div id="addroom">
            <button onClick={() => navigate(`/addRoom/${hotel._id}`)}>
              Add a Room
            </button>
          </div>
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
                <button onClick={(e) => handleUpdateRoom(e, room)}>Edit</button>
              </div>
            ))}
        </div>
      </div>
    )
  )
}
export default CompanyViewHotel
