import { useNavigate } from 'react-router-dom'
import { getAllCompanyHotels, deleteHotel } from '../services/company'
import { useState, useEffect, useContext } from 'react'
import BookingContext from '../context/BookingContext'

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
        <div className="CompanyProfileInfoDiv">
          <h1>Account</h1>
          <h2>Email </h2>
          <h3>{user.email}</h3>
          <h2>Password</h2>

          <button
            onClick={() => {
              navigate('../updatecompanyprofile')
            }}
          >
            Update Password
          </button>
          <button
            onClick={() => {
              navigate('../addHotel')
            }}
          >
            Add Hotel
          </button>
        </div>
        <div className="CompanyProfileHotelsListDiv">
          {hotels?.map((hotel) => (
            <div className="companyhotelcard" key={hotel._id}>
              <img src={hotel.image} alt={hotel.name} />
              <h3 className="companyhotelcardname">{hotel.name}</h3>
              <p>{hotel.description}</p>
              <p>
                {hotel.location.city}, {hotel.location.country}
              </p>
              <button
                onClick={() => {
                  navigate(`/viewcompanyhotel/${hotel._id}`)
                }}
              >
                View Details
              </button>
              <button onClick={(e) => handleDeleteHotel(e, hotel._id)}>
                X
              </button>
              <button onClick={(e) => handleUpdateHotel(e, hotel)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default CompanyProfile
