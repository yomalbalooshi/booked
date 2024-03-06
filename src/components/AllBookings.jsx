import { useState, useEffect } from 'react'
import { getAllCompanyHotels } from '../services/company'
import { ShowHotel } from '../services/Hotels'
import AllBookingsTable from './AllBookingsTable'
const AllBookings = ({ user }) => {
  const [hotels, setHotels] = useState([])
  const [selectedHotel, setselectedHotel] = useState({})
  useEffect(() => {
    const allHotels = async () => {
      let data = await getAllCompanyHotels(user.id)
      setHotels(data)
    }
    allHotels()
  }, [])
  const handleClick = async (e) => {
    let response = await ShowHotel(e.target.value)
    setselectedHotel(response)
    console.log(response)
  }
  return (
    <div>
      <h1>All Bookings</h1>
      <div className="CompanyProfileHotelsListDiv">
        {hotels?.map((hotel) => (
          <button
            key={hotel._id}
            value={hotel._id}
            onClick={(e) => handleClick(e)}
          >
            {hotel.name}
          </button>
        ))}
      </div>
      {selectedHotel && (
        <div>
          <AllBookingsTable hotel={selectedHotel} />
        </div>
      )}
    </div>
  )
}
export default AllBookings
