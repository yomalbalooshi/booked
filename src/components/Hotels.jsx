import { useEffect, useState } from 'react'
import { GetHotels } from '../services/Hotels'
import { Pagination } from '@mui/material'
import HotelCard from './HotelCard'

const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [searchHotel, setSearchHotel] = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const [checkedAmenities, setCheckedAmenities] = useState([])
  const [page, setPage] = useState(1)
  const hotelPerPage = 3

  const calculateBasePricesForHotels = (hotels) => {
    return hotels.map((hotel) => {
      if (hotel.rooms.length > 0) {
        let minPrice = hotel.rooms[0].price
        hotel.rooms.forEach((room) => {
          if (room.price < minPrice) {
            minPrice = room.price
          }
        })
        return {
          ...hotel,
          basePrice: minPrice
        }
      } else {
        return {
          ...hotel,
          basePrice: 0
        }
      }
    })
  }

  useEffect(() => {
    const handleHotels = async () => {
      const data = await GetHotels()
      setHotels(calculateBasePricesForHotels(data))
    }
    handleHotels()
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'search') {
      setSearchHotel(e.target.value.toLowerCase())
    }
    if (e.target.id === 'priceRange') {
      setPriceRange(e.target.value)
    }
    if (e.target.name === 'amenity') {
      if (e.target.checked) {
        setCheckedAmenities([...checkedAmenities, e.target.id])
      } else {
        const updatedAmenities = checkedAmenities.filter(
          (amenity) => amenity !== e.target.id
        )
        setCheckedAmenities(updatedAmenities)
      }
    }
  }
  const getAmenities = () => {
    let amenities = []
    hotels.map((hotel) =>
      hotel.amenities.forEach((amenity) => {
        amenities.push(amenity)
      })
    )
    return amenities
  }

  const amenityFilter = (hotel) => {
    if (checkedAmenities.length === 0) {
      return true
    }
    let result = false
    hotel.amenities.forEach((amenity) => {
      if (checkedAmenities.includes(amenity)) {
        result = true
      }
    })
    return result
  }
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchHotel) &&
      hotel.basePrice >= parseInt(priceRange) &&
      amenityFilter(hotel)
  )

  let totalPages = Math.ceil(filteredHotels.length) / hotelPerPage
  const lastIndex = page * hotelPerPage
  const displayedHotels = filteredHotels.slice(
    lastIndex - hotelPerPage,
    lastIndex
  )

  const handlePageChange = (e, value) => {
    setPage(value)
  }

  console.log('filtered ', filteredHotels)
  console.log(totalPages)
  return (
    <div>
      <div id="search">
        <label htmlFor="search">Search for Hotels</label>
        <input onChange={handleChange} type="text" name="search" id="search" />
      </div>
      <label htmlFor="priceRange">{priceRange}</label>
      <div id="price-slider">
        <input
          type="range"
          min="0"
          max="1000"
          id="priceRange"
          name="priceRange"
          value={priceRange}
          step="5"
          onChange={handleChange}
        ></input>
      </div>
      <div id="amenities">
        {getAmenities().map((amenity, index) => (
          <div id="amenity" key={index}>
            <input
              type="checkbox"
              name="amenity"
              id={amenity}
              value={amenity}
              onChange={handleChange}
            ></input>
            <label htmlFor="amenity"> {amenity}</label>
          </div>
        ))}
      </div>
      <div className="hotels">
        {displayedHotels.map((hotel) => (
          <div key={hotel._id}>
            <HotelCard
              hotel={hotel}
              priceRange={priceRange}
              checkedAmenities={checkedAmenities}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          onChange={handlePageChange}
          size="small"
          showFirstButton
          showLastButton
        />
      )}
    </div>
  )
}
export default Hotels
