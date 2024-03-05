import { useEffect, useState } from 'react'

import { GetHotels } from '../services/Hotels'
import { Pagination } from '@mui/material'
import HotelCard from './HotelCard'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

function valuetext(value) {
  return `${value}°C`
}

let beforeChange = null

const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [searchHotel, setSearchHotel] = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const [checkedAmenities, setCheckedAmenities] = useState([])
  const [page, setPage] = useState(1)
  const hotelPerPage = 3

  const [value, setValue] = useState([0, 300])

  const handleChange2 = (event, newValue) => {
    if (!beforeChange) {
      beforeChange = [...value]
    }

    if (beforeChange[0] !== newValue[0] && beforeChange[1] !== newValue[1]) {
      return
    }

    setValue(newValue)
  }

  const handleChangeCommitted = () => {
    beforeChange = null
  }

  console.log(value)
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

    hotels.forEach((hotel) => {
      hotel.amenities.forEach((amenity) => {
        if (!amenities.includes(amenity)) {
          amenities.push(amenity)
        }
      })
    })

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
      hotel.basePrice >= parseInt(value[0]) &&
      hotel.basePrice <= parseInt(value[1]) &&
      amenityFilter(hotel)
  )

  let totalPages = Math.round(filteredHotels.length / hotelPerPage)
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
        <TextField
          id="search"
          name="search"
          onChange={handleChange}
          sx={{ width: 350, mb: 3, mt: 3 }}
          label="Search Hotel..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      {/* <label htmlFor="priceRange">{priceRange}</label>
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
      </div> */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: 10, pl: 1, pr: 1 }}>{value[0]}</Typography>
          <Slider
            value={value}
            onChange={handleChange2}
            onChangeCommitted={handleChangeCommitted}
            sx={{ width: 250, ml: 1, mr: 1 }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            max={450}
          />
          <Typography sx={{ width: 10, pl: 1, pr: 1 }}>{value[1]}</Typography>
        </div>
      </div>
      <div id="amenities">
        {getAmenities().map((amenity, index) => (
          <div id="amenity" key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  name="amenity"
                  id={amenity}
                  value={amenity}
                  color="success"
                  onChange={handleChange}
                />
              }
              label={amenity}
            />
            {/* <input
              type="checkbox"
              name="amenity"
              id={amenity}
              value={amenity}
              onChange={handleChange}
            ></input>
            <label htmlFor="amenity"> {amenity}</label> */}
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
