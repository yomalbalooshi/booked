import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'

const Booking = ({ user }) => {
  let { id } = useParams()
  let [hotel, setHotel] = useState({})

  useEffect(() => {
    const getHotelDetails = async () => {
      let response = await ShowHotel(id)
      console.log('response ', response)
      setHotel(response)
    }
    getHotelDetails()
  }, [])

  console.log(hotel)
  const [selectedRoom, setSelectedRoom] = useState('')
  console.log(hotel)

  const [formValues, setFormValues] = useState({
    hotelId: hotel._id,
    roomType: '',
    checkIn: '',
    checkOut: '',
    noOfRooms: '',
    adults: '',
    children: '',
    specialRequest: '',
    lateCheckOut: '',
    earlyCheckOut: '',
    totalCost: '',
    extraBed: '',
    customerId: user._id
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSelectedRoom = (e, room) => {
    if (e.target.name === 'roomType') {
      setSelectedRoom(room)
    }
  }
  console.log(selectedRoom)
  return (
    <div>
      <h2>{hotel.name}</h2>
      <form>
        <div>
          {hotel.rooms &&
            hotel.rooms.length > 0 &&
            hotel.rooms.map((room) => (
              <div>
                <input
                  type="radio"
                  id={room.name}
                  name="roomType"
                  value={room._id}
                  required
                  onChange={handleChange}
                  onClick={(e) => handleSelectedRoom(e, room)}
                ></input>
                <label htmlFor="roomType">
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
                </label>
              </div>
            ))}
        </div>
        <div>
          <label htmlFor="checkIn">CheckIn</label>
          <input
            onChange={handleChange}
            name="checkIn"
            type="date"
            value={formValues.checkIn}
            required
          />
        </div>
        <div>
          <label htmlFor="checkIn">CheckOut</label>
          <input
            onChange={handleChange}
            name="checkOut"
            type="date"
            value={formValues.checkOut}
            required
          />
        </div>
        <div>
          <label htmlFor="noOfRooms">No of Rooms</label>
          <input
            onChange={handleChange}
            type="number"
            name="noOfRooms"
            value={formValues.noOfRooms}
            required
          />
        </div>
        <div>
          <label htmlFor="adults">Adults</label>
          <input
            onChange={handleChange}
            type="number"
            name="adults"
            value={formValues.adults}
            max={selectedRoom.maxAdults}
            required
          />
        </div>
        <div>
          <label htmlFor="children">Children</label>
          <input
            onChange={handleChange}
            type="number"
            name="children"
            value={formValues.children}
            max={selectedRoom.maxChildren}
            required
          />
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  )
}
export default Booking
