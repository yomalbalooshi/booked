import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { addCustomerBooking } from '../services/booking'
import BookingContext from '../context/BookingContext'
import dayjs from 'dayjs'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Carousel from 'react-material-ui-carousel'

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
  if (Object.keys(hotel).length !== 0 && user) {
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
      navigate('/profile')
      await addCustomerBooking(booking)
      // setBooked((prev) => !prev)
      updateBooking()
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
    user &&
    user.type === 'customer' && (
      <div className="booking-form shadow-2xl ">
        <h1> Hotel Booking</h1>
        <h2>{hotel.name} </h2>
        <form onSubmit={handleSubmit}>
          <div className="rooms">
            {hotel.rooms &&
              hotel.rooms.length > 0 &&
              hotel.rooms.map((room) => (
                <div key={room._id} className="room-card-container">
                  <h3 className="font-bold text-2xl">{room.roomType}</h3>
                  <div className="room-card">
                    <input
                      type="radio"
                      id={room.name}
                      name="roomType"
                      value={room._id}
                      required
                      onClick={(e) => handleSelectedRoom(e, room)}
                    ></input>
                    <label htmlFor="roomType">
                      <div className="text-left">
                        <h4 className="font-bold mb-5">Features</h4>
                        <p className="pb-3">Max Adults: {room.maxAdults}</p>
                        <p className="pb-3">Max Children: {room.maxChildren}</p>
                        <p className="pb-3">Price: {room.price} $</p>
                      </div>
                    </label>
                    <div className="amenities">
                      <h4 className="font-bold">Amenities</h4>
                      {room.amenities && room.amenities.length > 0 && (
                        <ul className="list-disc ">
                          {room.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="carousel-container">
                      {room.images && room.images.length > 0 && (
                        <Carousel>
                          {room.images.map((image, index) => (
                            <img
                              className="room-image"
                              key={index}
                              src={image}
                            ></img>
                          ))}
                        </Carousel>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div id="cal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                minDate={dayjs()}
                sx={{ mt: 2 }}
                localeText={{ start: 'Check-in', end: 'Check-out' }}
                datevalue={datevalue}
                onChange={(newDateValue) => setDateValue(newDateValue)}
              />
            </LocalizationProvider>
          </div>

          <div>
            <TextField
              type="number"
              name="noOfRooms"
              InputProps={{ inputProps: { min: 0 } }}
              onChange={handleNumberOfRooms}
              sx={{ mt: 2 }}
              fullWidth
              label="No of rooms"
            />
          </div>
          <div>
            {/* <label htmlFor="adults">Adults</label>
          <input
            type="number"
            name="adults"
            max={selectedRoom.maxAdults}
            min="1"
            required
          /> */}
            <TextField
              type="number"
              name="adults"
              InputProps={{
                inputProps: { min: 0, max: selectedRoom.maxAdults }
              }}
              sx={{ mt: 2 }}
              fullWidth
              label="No of Adults"
            />
          </div>
          <div>
            {/* <label htmlFor="children">Children</label>
          <input
            type="number"
            name="children"
            max={selectedRoom.maxChildren}
            min="1"
            required
          /> */}
            <TextField
              type="number"
              name="children"
              InputProps={{
                inputProps: { min: 0, max: selectedRoom.maxChildren }
              }}
              sx={{ mt: 2 }}
              fullWidth
              label="No of Children"
            />
          </div>
          <div>
            {/* <p>
            <label htmlFor="specialRequest">Special Requests</label>
          </p>
          <textarea
            id="specialRequest"
            name="specialRequest"
            rows="3"
            cols="30"
            placeholder="Special Requests..."
          ></textarea> */}
            <TextField
              type="text"
              name="specialRequest"
              sx={{ mt: 2 }}
              fullWidth
              label="Special Request"
            />
          </div>
          <div className="booking-checkboxes">
            {/* <input
            type="checkbox"
            name="lateCheckOut"
            id="lateCheckOut"
            onChange={handleCheckboxes}
            checked={lateCheckOut}
          />
          <label htmlFor="lateCheckOut">Late Check Out</label> */}
            <FormControlLabel
              control={
                <Checkbox
                  name="lateCheckOut"
                  id="lateCheckOut"
                  checked={lateCheckOut}
                  color="success"
                  onChange={handleCheckboxes}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              }
              label={
                <Typography sx={{ fontSize: 14 }}>Late Check Out</Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="earlyCheckIn"
                  id="earlyCheckIn"
                  checked={earlyCheckIn}
                  color="success"
                  onChange={handleCheckboxes}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              }
              label={
                <Typography sx={{ fontSize: 14 }}>Early Check In</Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="extraBed"
                  id="extraBed"
                  checked={extraBed}
                  color="success"
                  onChange={handleCheckboxes}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>Extra Bed</Typography>}
            />
          </div>
          {/* <div>
          <input
            type="checkbox"
            name="earlyCheckIn"
            id="earlyCheckIn"
            onChange={handleCheckboxes}
            checked={earlyCheckIn}
          />
          <label htmlFor="lateCheckOut">Early Check In</label>
        </div> */}
          {/* <div>
          <input
            type="checkbox"
            name="extraBed"
            id="extraBed"
            onChange={handleCheckboxes}
            checked={extraBed}
          />
          <label htmlFor="lateCheckOut">Extra Bed</label>
        </div> */}
          <div className="fixed-bottom">
            <h3 id="totalPrice">
              Total Price: <span id="price">$ {totalPrice()}</span>
            </h3>
            <Button type="submit" variant="contained" color="success">
              Book
            </Button>
          </div>
        </form>
      </div>
    )
  )
}
export default Booking
