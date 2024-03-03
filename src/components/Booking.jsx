import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { addCustomerBooking } from '../services/booking'
import BookingContext from '../context/BookingContext'

import dayjs from 'dayjs'

const Booking = ({ user }) => {
  let navigate = useNavigate()
  const [datevalue, setDateValue] = useState([dayjs(), dayjs().add(1, 'day')])
  let { id } = useParams()
  let [hotel, setHotel] = useState({})
  const [noOfrooms, setNoOfRooms] = useState(1)
  const [earlyCheckIn, setEarlyCheckIn] = useState(false)
  const [lateCheckOut, setlateCheckOut] = useState(false)
  const [extraBed, setExtraBed] = useState(false)
  const { updateBooking } = useContext(BookingContext)
  let booking
  if (Object.keys(hotel).length !== 0) {
    booking = {
      hotelId: hotel._id,
      roomType: '',
      checkIn: '',
      checkOut: '',
      noOfRooms: '',
      adults: '',
      children: '',
      specialRequest: '',
      lateCheckOut: '',
      earlyCheckIn: '',
      totalCost: '',
      extraBed: '',
      customerId: user.id
    }
  }

  useEffect(() => {
    const getHotelDetails = async () => {
      let response = await ShowHotel(id)
      setHotel(response)
    }
    getHotelDetails()
  }, [])

  const [selectedRoom, setSelectedRoom] = useState('')

  const handleCheckboxes = (e) => {
    switch (e.target.name) {
      case 'earlyCheckIn':
        setEarlyCheckIn(e.target.checked)
        break
      case 'lateCheckOut':
        setlateCheckOut(e.target.checked)
        break
      case 'extraBed':
        setExtraBed(e.target.checked)
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    booking.roomType = selectedRoom._id
    booking.checkIn = datevalue[0].format('YYYY/MM/DD')
    booking.checkOut = datevalue[1].format('YYYY/MM/DD')
    booking.noOfRooms = e.target.noOfRooms.value
    booking.adults = e.target.adults.value
    booking.children = e.target.children.value
    booking.specialRequest = e.target.specialRequest.value
    booking.lateCheckout = lateCheckOut
    booking.earlyCheckIn = earlyCheckIn
    booking.extraBed = extraBed
    booking.totalCost = totalPrice()

    try {
      await addCustomerBooking(booking)
      updateBooking()
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectedRoom = (e, room) => {
    if (e.target.name === 'roomType') {
      setSelectedRoom(room)
    }
  }
  const handleNumberOfRooms = (e) => {
    setNoOfRooms(e.target.value)
  }

  const totalPrice = () => {
    let basePrice = selectedRoom.price
    let total = basePrice
    let dayDifference = datevalue[0].diff(datevalue[1], 'day') * -1
    // let noOfRooms = e.target.noOfRooms
    if (lateCheckOut === true || earlyCheckIn === true) {
      total += basePrice / 2
    }
    if (lateCheckOut === true && earlyCheckIn === true) {
      total += basePrice
    }

    total = total * noOfrooms
    total = total * dayDifference

    if (isNaN(total)) {
      return 0
    } else {
      return total
    }
  }

  return (
    <div>
      <h2>{hotel.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {hotel.rooms &&
            hotel.rooms.length > 0 &&
            hotel.rooms.map((room) => (
              <div key={room._id}>
                <input
                  type="radio"
                  id={room.name}
                  name="roomType"
                  value={room._id}
                  required
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
        <div id="cal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              minDate={dayjs()}
              localeText={{ start: 'Check-in', end: 'Check-out' }}
              datevalue={datevalue}
              onChange={(newDateValue) => setDateValue(newDateValue)}
            />
          </LocalizationProvider>
        </div>

        <div>
          <label htmlFor="noOfRooms">No of Rooms</label>
          <input
            type="number"
            name="noOfRooms"
            min="1"
            required
            onChange={handleNumberOfRooms}
          />
        </div>
        <div>
          <label htmlFor="adults">Adults</label>
          <input
            type="number"
            name="adults"
            max={selectedRoom.maxAdults}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="children">Children</label>
          <input
            type="number"
            name="children"
            max={selectedRoom.maxChildren}
            min="1"
            required
          />
        </div>
        <div>
          <p>
            <label htmlFor="specialRequest">Special Requests</label>
          </p>
          <textarea
            id="specialRequest"
            name="specialRequest"
            rows="3"
            cols="30"
            placeholder="Special Requests..."
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="lateCheckOut"
            id="lateCheckOut"
            onChange={handleCheckboxes}
            checked={lateCheckOut}
          />
          <label htmlFor="lateCheckOut">Late Check Out</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="earlyCheckIn"
            id="earlyCheckIn"
            onChange={handleCheckboxes}
            checked={earlyCheckIn}
          />
          <label htmlFor="lateCheckOut">Early Check In</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="extraBed"
            id="extraBed"
            onChange={handleCheckboxes}
            checked={extraBed}
          />
          <label htmlFor="lateCheckOut">Extra Bed</label>
        </div>
        <div>
          <h3 id="totalPrice">
            Total Price: <span id="price">$ {totalPrice()}</span>
          </h3>
        </div>
        <button>Book</button>
      </form>
    </div>
  )
}
export default Booking
