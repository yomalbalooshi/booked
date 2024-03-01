import { useEffect, useState } from 'react'
import { GetHotels } from '../services/Hotels'

import HotelCard from './HotelCard'

const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [searchHotel, setSearchHotel] = useState([])
  const [priceRange, setPriceRange] = useState(0)
  const [checkedAmenities, setCheckedAmenities] = useState([])

  useEffect(() => {
    const handleHotels = async () => {
      const data = await GetHotels()
      setHotels(data)
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

  console.log(checkedAmenities)
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
        {hotels.map(
          (hotel) =>
            hotel.name.toLowerCase().includes(searchHotel) && (
              <div key={hotel._id}>
                <HotelCard
                  hotel={hotel}
                  priceRange={priceRange}
                  checkedAmenities={checkedAmenities}
                />
              </div>
            )
        )}
      </div>
    </div>
  )
}
export default Hotels
