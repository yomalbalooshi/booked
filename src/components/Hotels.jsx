import { useEffect, useState } from 'react'
import { GetCities } from '../services/city'
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
import Autocomplete from '@mui/material/Autocomplete'
function valuetext(value) {
  return `${value}°C`
}

let beforeChange = null

const Hotels = ({ user }) => {
  const [hotels, setHotels] = useState([])
  const [searchHotel, setSearchHotel] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const [checkedAmenities, setCheckedAmenities] = useState([])
  const [page, setPage] = useState(1)
  const hotelPerPage = 4

  const [value, setValue] = useState([0, 300])
  const [cities, setCities] = useState({})
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
  useEffect(() => {
    const getAllCities = async () => {
      let response = await GetCities()
      setCities(response)
    }
    getAllCities()
  }, [])
  let countries = []
  if (Object.keys(cities).length !== 0) {
    cities.forEach((city) => {
      if (!countries.includes(city.country)) {
        countries.push(`${city.city}, ${city.country}`)
      }
    })
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
      (!location ||
        location.trim() === '' ||
        `${hotel.location.city.toLowerCase()}, ${hotel.location.country.toLowerCase()}` ===
          location.toLowerCase()) &&
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

  return (
    <div className="flex justify-around mt-12">
      <div className="filters">
        <div className="search-hotels">
          <TextField
            id="search"
            name="search"
            onChange={handleChange}
            sx={{ width: 350, mb: 3 }}
            label="Search Hotel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            options={countries}
            sx={{ mb: 2 }}
            onChange={(e, value) => setLocation(value)}
            required
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                id="country"
                name="country"
              />
            )}
          />
        </div>
        <div>
          <div>
            <h2 className="filter-title">Price Range</h2>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            className="search-slider"
          >
            <Typography sx={{ width: 10, pl: 0, pr: 2 }}>{value[0]}</Typography>
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
        <div>
          <h2 className="filter-title">Amenities</h2>
        </div>
        <div id="amenities" className="search-slider">
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
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          {displayedHotels.map((hotel) => (
            <div key={hotel._id}>
              <HotelCard hotel={hotel} user={user} />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              onChange={handlePageChange}
              size="large"
              showFirstButton
              showLastButton
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Hotels
