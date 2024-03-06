import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCompanyHotel } from '../services/company'
import BookingContext from '../context/BookingContext'
import { GetCities } from '../services/city'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const AddHotel = ({ user }) => {
  let navigate = useNavigate()
  const { updateBooking } = useContext(BookingContext)
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',

    image: '',
    amenities: ['']
  })
  const [cities, setCities] = useState([])
  const [location, setLocation] = useState('')

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
      countries.push({ label: `${city.city}, ${city.country} `, id: city._id })
    })
  }

  const handleChange = (e, index) => {
    const updatedAmenities = [...formValues.amenities]
    updatedAmenities[index] = e.target.value
    setFormValues({ ...formValues, amenities: updatedAmenities })
  }

  const addAmenity = () => {
    setFormValues({ ...formValues, amenities: [...formValues.amenities, ''] })
  }

  const removeAmenity = (index) => {
    if (formValues.amenities.length > 1) {
      const updatedAmenities = [...formValues.amenities]
      updatedAmenities.splice(index, 1)
      setFormValues({ ...formValues, amenities: updatedAmenities })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/companyprofile')
    await addCompanyHotel({
      name: formValues.name,
      description: formValues.description,
      location: location,
      image: formValues.image,
      amenities: formValues.amenities.filter(
        (amenity) => amenity.trim() !== ''
      ),
      companyId: user.id
    })
    updateBooking()
  }
  const logCountry = (e, value) => {
    setLocation(value)
  }

  return (
    user &&
    user.type === 'company' && (
      <div>
        <h1>Add a hotel {user.id}</h1>
        <section>
          <form onSubmit={handleSubmit}>
            <label>Hotel Name: </label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              placeholder="Hotel Name"
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              required
            />
            <br />
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={formValues.description}
              placeholder="Hotel Description"
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
              required
            />
            <br />
            <Autocomplete
              disablePortal
              id="location"
              options={countries}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(e, value) => logCountry(e, value.id)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Countries" />
              )}
            />

            <br />
            <label>Amenities:</label>
            {formValues.amenities.map((amenity, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={amenity}
                  placeholder={`Amenity ${index + 1}`}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
                {index > 0 && (
                  <button type="button" onClick={() => removeAmenity(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addAmenity}>
              Add More
            </button>
            <br />
            <label>Image: </label>
            <input
              type="text"
              name="image"
              value={formValues.image}
              placeholder="Hotel Image"
              onChange={(e) =>
                setFormValues({ ...formValues, image: e.target.value })
              }
              required
            />
            <br />
            <button type="submit">Add Hotel</button>
          </form>
        </section>
      </div>
    )
  )
}

export default AddHotel
