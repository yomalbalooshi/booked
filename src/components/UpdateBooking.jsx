import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ShowBooking, UpdateCustomerBooking } from '../services/booking'

import dayjs from 'dayjs'

const Booking = ({ user }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  let [currentBooking, setCurrentBooking] = useState({})

  const [noOfrooms, setNoOfRooms] = useState()
  const [datevalue, setDateValue] = useState([dayjs(), dayjs().add(1, 'day')])
  const [earlyCheckIn, setEarlyCheckIn] = useState(false)
  const [lateCheckOut, setlateCheckOut] = useState(false)
  const [extraBed, setExtraBed] = useState(false)
  const [adults, setAdults] = useState()
  const [children, setChildren] = useState()
  const [specialRequest, setSpecialRequest] = useState()
  const [prevTotal, setPrevTotal] = useState()
  const [roomPrice, setRoomPrice] = useState()

  useEffect(() => {
    const getBookingDetails = async () => {
      let response = await ShowBooking(id)

      setCurrentBooking(response)
      setNoOfRooms(response.noOfRooms)
      setDateValue([dayjs(response.checkIn), dayjs(response.checkOut)])
      setAdults(response.adults)
      setChildren(response.children)

      setSpecialRequest(response.specialRequest)
      setlateCheckOut(response.lateCheckout)
      setEarlyCheckIn(response.earlyCheckIn)
      setExtraBed(response.extraBed)
      setPrevTotal(response.totalCost)
      setRoomPrice(response.roomType.price)
      console.log(response)
    }
    getBookingDetails()
  }, [])

  let booking = {
    id: '',
    checkIn: '',
    checkOut: '',
    noOfRooms: '',
    adults: '',
    children: '',
    specialRequest: '',
    lateCheckOut: '',
    earlyCheckIn: '',
    totalCost: '',
    extraBed: ''
  }

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
  const onChange = (e) => {
    switch (e.target.name) {
      case 'adults':
        setAdults(e.target.value)
        break
      case 'children':
        setChildren(e.target.value)
        break
      case 'specialRequest':
        setSpecialRequest(e.target.value)
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    booking.id = currentBooking._id
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
      await UpdateCustomerBooking(booking)
      navigate('/profile')
    } catch (error) {
      throw error
    }
  }

  const handleNumberOfRooms = (e) => {
    setNoOfRooms(e.target.value)
  }

  const totalPrice = () => {
    let basePrice = roomPrice
    let total = basePrice
    let dayDifference = datevalue[0].diff(datevalue[1], 'day') * -1

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
      <form onSubmit={handleSubmit}>
        <div id="cal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              minDate={dayjs()}
              localeText={{ start: 'Check-in', end: 'Check-out' }}
              datevalue={datevalue}
              defaultValue={datevalue}
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
            value={noOfrooms || ''}
            required
            onChange={handleNumberOfRooms}
          />
        </div>
        <div>
          <label htmlFor="adults">Adults</label>
          <input
            type="number"
            name="adults"
            value={adults || ''}
            max={selectedRoom.maxAdults}
            min="1"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="children">Children</label>
          <input
            type="number"
            name="children"
            value={children || ''}
            max={selectedRoom.maxChildren}
            min="1"
            onChange={onChange}
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
            value={specialRequest || ''}
            cols="30"
            onChange={onChange}
            placeholder="Special Requests..."
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="lateCheckOut"
            id="lateCheckOut"
            onChange={handleCheckboxes}
            checked={lateCheckOut || ''}
          />
          <label htmlFor="lateCheckOut">Late Check Out</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="earlyCheckIn"
            id="earlyCheckIn"
            onChange={handleCheckboxes}
            checked={earlyCheckIn || ''}
          />
          <label htmlFor="lateCheckOut">Early Check In</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="extraBed"
            id="extraBed"
            onChange={handleCheckboxes}
            checked={extraBed || ''}
          />
          <label htmlFor="lateCheckOut">Extra Bed</label>
        </div>
        <div>
          <h3 id="totalPrice">
            Total Price: <span id="price">$ {totalPrice()}</span>
          </h3>
        </div>
        <button>Update Booking</button>
      </form>
    </div>
  )
}
export default Booking
