import { useState, useEffect } from 'react'
import { getAllCompanyHotels } from '../services/company'
import HotelCharts from './HotelCharts'
import { ShowHotel } from '../services/Hotels'

const Dashboard = ({ user }) => {
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
    user &&
    user.type === 'company' && (
    <div>
      <h1>Dashboard</h1>
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
          <HotelCharts selectedHotel={selectedHotel} />
        </div>
      )}
    </div>)
  )
}
export default Dashboard
