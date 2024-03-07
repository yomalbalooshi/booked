import { useNavigate } from 'react-router-dom'
import { getAllCutomerBookings, deleteBooking } from '../services/booking'
import { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button'
import BookingContext from '../context/BookingContext'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import dayjs from 'dayjs'

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false
  }
  return true
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault()
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  )
}

LinkTab.propTypes = {
  selected: PropTypes.bool
}

const Profile = ({ user }) => {
  const { bookingUpdate } = useContext(BookingContext)

  const navigate = useNavigate()

  const [customerBookings, setCustomerBookings] = useState([])

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

  const pastbookings = []
  const currentbookings = []

  if (customerBookings) {
    for (let i = 0; i < customerBookings.length; i++) {
      const checkIn = new Date(customerBookings[i].checkIn).getTime()
      const checkOut = new Date(customerBookings[i].checkOut).getTime()
      const now = Date.now()
      if (checkIn < now || checkOut < now) {
        pastbookings.push(customerBookings[i])
      } else {
        currentbookings.push(customerBookings[i])
      }
    }
  }

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue)
    }
  }

  return (
    user &&
    user.type === 'customer' && (
      <div>
        <div className="ml-2 flex justify-center text-center mb-10">
          <div className="CompanyProfileInfoDiv">
            <h1 className="text-3xl font-semibold mt-10">Account</h1>
            <h2 className="pt-4 text-xl">Email </h2>
            <h3 className="text-lg">{user.email}</h3>
            <div className="flex mb-6">
              <Button
                onClick={() => {
                  navigate('/updateprofile')
                }}
                variant="outlined"
                color="primary"
                sx={{ marginTop: 1 }}
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            role="navigation"
          >
            <LinkTab label="Past Bookings" href="/past" />
            <LinkTab label="Current Bookings" href="/current" />
          </Tabs>
        </div>
        <div>
          {value === 0 ? (
            <div>
              {pastbookings &&
                pastbookings.length !== 0 &&
                pastbookings.map((booking) => (
                  <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg mb-4 relative p-10 ">
                    <div className="mb-10 flex justify-between">
                      <p className="text-xl font-bold text-cyan-950  ">
                        {dayjs(booking.checkIn).format('DD/MM/YYYY')} -{' '}
                        {dayjs(booking.checkOut).format('DD/MM/YYYY')}
                      </p>
                      <p className="text-xl font-semibold text-right text-cyan-950">
                        {booking.totalCost} $
                      </p>
                    </div>

                    <div className="flex justify-between ">
                      <div>
                        <p className="text-3xl font-bold mb-4 text-slate-700	">
                          {booking.hotelId.name}
                        </p>
                        <p className="text-2xl mb-4">
                          {booking.roomType?.roomType}
                        </p>
                      </div>
                      <div className="mt-5">
                        <p className="text-lg mb-3 ">
                          {' '}
                          <span className="font-semibold mr-2 text-slate-700 min-w-36">
                            Adults:
                          </span>{' '}
                          {booking.adults}
                        </p>
                        <p className="text-lg">
                          {' '}
                          <span className="font-semibold mr-2 text-slate-700 min-w-36 ">
                            Children:
                          </span>{' '}
                          {booking.children}
                        </p>
                      </div>
                      <div className="mt-5">
                        <p className="text-lg flex mb-3 ">
                          <span className="font-semibold mr-2 text-slate-700 min-w-36">
                            Early Check In:
                          </span>{' '}
                          {booking.earlyCheckIn ? (
                            <img
                              src="images/checked.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          ) : (
                            <img
                              src="images/multiply.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          )}
                        </p>
                        <p className="text-lg flex mb-3 justify-between ">
                          <span className="font-semibold mr-2 text-slate-700 min-w-36">
                            Early Check Out
                          </span>
                          {booking.lateCheckout ? (
                            <img
                              src="images/checked.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          ) : (
                            <img
                              src="images/multiply.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          )}
                        </p>
                      </div>
                      <div className="mt-5  ">
                        <p className="text-lg flex mb-3 ">
                          <span className="font-semibold mr-2 text-slate-700 ">
                            Extra Bed:
                          </span>{' '}
                          {booking.extraBed ? (
                            <img
                              src="images/checked.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          ) : (
                            <img
                              src="images/multiply.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          )}
                        </p>

                        <p className="text-lg mr-36">
                          <span className="font-semibold mr-2 text-slate-700 ">
                            No of Rooms:
                          </span>
                          {booking.noOfRooms}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <p className="text-lg mt-5">
                      <span className="font-semibold mr-2 text-slate-700">
                        Special Request:{' '}
                      </span>
                      {booking.specialRequest
                        ? booking.specialRequest
                        : '  None'}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {currentbookings &&
                currentbookings.length !== 0 &&
                currentbookings.map((booking) => (
                  <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg mb-4 relative p-10 ">
                    <div className="mb-10 flex justify-between">
                      <p className="text-xl font-bold text-cyan-950  ">
                        {dayjs(booking.checkIn).format('DD/MM/YYYY')} -{' '}
                        {dayjs(booking.checkOut).format('DD/MM/YYYY')}
                      </p>
                      <p className="text-xl font-semibold text-right text-cyan-950">
                        {booking.totalCost} $
                      </p>
                    </div>

                    <div className="flex justify-between ">
                      <div>
                        <p className="text-3xl font-bold mb-4 text-slate-700	">
                          {booking.hotelId.name}
                        </p>
                        <p className="text-2xl mb-4">
                          {booking.roomType?.roomType}
                        </p>
                      </div>
                      <div className="mt-5">
                        <p className="text-lg mb-3 ">
                          {' '}
                          <span className="font-semibold mr-2 text-slate-700 min-w-36">
                            Adults:
                          </span>{' '}
                          {booking.adults}
                        </p>
                        <p className="text-lg">
                          {' '}
                          <span className="font-semibold mr-2 text-slate-700 min-w-36 ">
                            Children:
                          </span>{' '}
                          {booking.children}
                        </p>
                      </div>
                      <div className="mt-5">
                        <p className="text-lg flex mb-3 ">
                          <span className="font-semibold mr-2 text-slate-700 min-w-36">
                            Early Check In:
                          </span>{' '}
                          {booking.earlyCheckIn ? (
                            <img
                              src="images/checked.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          ) : (
                            <img
                              src="images/multiply.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          )}
                        </p>
                        <p className="text-lg flex mb-3 justify-between ">
                          <span className="font-semibold mr-2 text-slate-700 min-w-36">
                            Early Check Out
                          </span>
                          {booking.lateCheckout ? (
                            <img
                              src="images/checked.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          ) : (
                            <img
                              src="images/multiply.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          )}
                        </p>
                      </div>
                      <div className="mt-5  ">
                        <p className="text-lg flex mb-3 ">
                          <span className="font-semibold mr-2 text-slate-700 ">
                            Extra Bed:
                          </span>{' '}
                          {booking.extraBed ? (
                            <img
                              src="images/checked.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          ) : (
                            <img
                              src="images/multiply.png"
                              className="max-w-6 max-h-6"
                            ></img>
                          )}
                        </p>

                        <p className="text-lg mr-36">
                          <span className="font-semibold mr-2 text-slate-700 ">
                            No of Rooms:
                          </span>
                          {booking.noOfRooms}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-10">
                      <p className="text-lg mt-5">
                        <span className="font-semibold mr-2 text-slate-700">
                          Special Request:{' '}
                        </span>
                        {booking.specialRequest
                          ? booking.specialRequest
                          : '  None'}
                      </p>
                      <Button
                        onClick={() => {
                          handleDeleteBooking(booking._id)
                        }}
                        variant="outlined"
                        color="error"
                      >
                        Delete Booking
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    )
  )
}
export default Profile
