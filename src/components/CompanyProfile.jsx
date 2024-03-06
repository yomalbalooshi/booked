import { useNavigate } from 'react-router-dom'
import { getAllCompanyHotels, deleteHotel } from '../services/company'
import { useState, useEffect, useContext } from 'react'
import BookingContext from '../context/BookingContext'
import HotelCard from './HotelCard'
import { Button } from '@mui/material'

const CompanyProfile = ({ user }) => {
  const { bookingUpdate } = useContext(BookingContext)
  let navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  // const [deletedHotel, setDeletedHotel] = useState(false) to redirect to same page

  useEffect(() => {
    const allHotels = async () => {
      let data = await getAllCompanyHotels(user.id)
      console.log(data)
      setHotels(data)
      console.log(hotels)
    }
    allHotels()
  }, [user, bookingUpdate])

  const handleDeleteHotel = async (e, hotelId) => {
    try {
      await deleteHotel(hotelId)

      const updatedHotels = hotels.filter((hotel) => hotel._id !== hotelId)
      setHotels(updatedHotels)
    } catch (error) {
      console.error('Error deleting hotel:', error)
    }
  }

  const handleUpdateHotel = async (e, hotel) => {
    navigate('/updatehotel', { state: { hotel: hotel } })
  }

  return (
    user &&
    user.type === 'company' &&
    Object.keys(hotels).length !== 0 && (
      <div>
        <div className="ml-2">
          <div className="CompanyProfileInfoDiv">
            <h1 className="text-3xl font-semibold mt-10">Account</h1>
            <h2 className="pt-4 text-xl">Email </h2>
            <h3 className="text-lg">{user.email}</h3>
            <div className="flex mb-6">
              <Button
                onClick={() => {
                  navigate('../updatecompanyprofile')
                }}
                variant="outlined"
                color="primary"
                sx={{ marginTop: 1 }}
              >
                Update Password
              </Button>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <Button
              onClick={() => {
                navigate('../addHotel')
              }}
              variant="outlined"
              color="success"
            >
              Add Hotel
            </Button>
          </div>
        </div>

        <div className="CompanyProfileHotelsListDiv">
          {hotels?.map((hotel) => (
            <div className="companyhotelcard" key={hotel._id}>
              <HotelCard
                hotel={hotel}
                user={user}
                handleDeleteHotel={handleDeleteHotel}
                handleUpdateHotel={handleUpdateHotel}
                hotelId={hotel._id}
              />
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default CompanyProfile
