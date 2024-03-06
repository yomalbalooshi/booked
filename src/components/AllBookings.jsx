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
  }
  return (
    <div>
      <div className="flex justify-center">
        <div
          className="inline-flex w-fit justify-center space-x-4  shadow-sm"
          role="group"
        >
          {hotels?.map((hotel) => (
            <button
              type="button"
              key={hotel._id}
              value={hotel._id}
              onClick={(e) => handleClick(e)}
              className="px-4 rounded-md py-2 text-xl font-normal text-gray-900 mt-4  bg-transparent border border-gray-900  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-900 focus:bg-gray-900 focus:text-stone-100"
            >
              {hotel.name}
            </button>
          ))}
        </div>
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
