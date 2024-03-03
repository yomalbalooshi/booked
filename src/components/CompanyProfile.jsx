import { NavLink, useNavigate } from 'react-router-dom'
import { getAllCompanyHotels, deleteHotel } from '../services/company'
import { useState, useEffect } from 'react'

const CompanyProfile = ({ user }) => {
  console.log(user.id)
  let navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  // const [deletedHotel, setDeletedHotel] = useState(false) to redirect to same page

  useEffect(() => {
    const allHotels = async () => {
      let data = await getAllCompanyHotels(user.id)
      setHotels(data)
    }
    allHotels()
  }, [])
  const handleDeleteHotel = async (e, hotel) => {
    try {
      const res = await deleteHotel(hotel._id)
      navigate('/')
    } catch (error) {
      console.error('Error deleting hotel:', error)
    }
    // setDeletedHotel(true) to redirect to same page
  }
  const handleUpdateHotel = async (e, hotel) => {
    navigate('/updatehotel', { state: { hotel: hotel } })
  }
  return (
    <div>
      <div className="CompanyProfileInfoDiv">
        <h1>Account</h1>
        <h2>Email </h2>
        <h3>{user.email}</h3>
        <h2>Password</h2>
        <h3>
          <NavLink to="../updatecompanyprofile">Update Pass</NavLink>
        </h3>
      </div>
      <div className="CompanyProfileHotelsDiv">
        <div className="CompanyProfileHotelsDivTitle">
          <h2>Your Hotels</h2>
          <NavLink to="../addHotel">Add a new Hotel</NavLink>
        </div>
        <div className="CompanyProfileHotelsListDiv">
          {hotels?.map((hotel) => (
            <div className="event-card" key={hotel._id}>
              <h3 className="name">{hotel.name}</h3>
              <button onClick={(e) => handleDeleteHotel(e, hotel)}>X</button>
              <button onClick={(e) => handleUpdateHotel(e, hotel)}>
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CompanyProfile
