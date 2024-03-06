import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCompanyHotel } from '../services/company'
import BookingContext from '../context/BookingContext'
import { GetCities } from '../services/city'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
        <div className="shadow-2xl max-w-3xl mx-auto flex justify-center pb-16 mt-32 mb-10 ">
          <form onSubmit={handleSubmit} className="update-hotel-form">
            <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20">
              Add Hotel
            </h1>
            <div>
              <div>
                <TextField
                  type="text"
                  name="name"
                  value={formValues.name || ''}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  required
                  sx={{ mt: 4 }}
                  fullWidth
                  label="Name"
                  InputLabelProps={{ shrink: true }}
                />
              </div>

              <div>
                <TextField
                  type="text"
                  name="description"
                  value={formValues.description || ''}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      description: e.target.value
                    })
                  }
                  required
                  sx={{ mt: 3 }}
                  fullWidth
                  label="Description"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <Autocomplete
                  disablePortal
                  id="location"
                  options={countries}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(e, value) => logCountry(e, value.id)}
                  sx={{ mt: 3 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Countries" />
                  )}
                />
              </div>
              {formValues.amenities.map((amenity, index) => (
                <div key={index} className="flex justify-between">
                  <TextField
                    type="text"
                    name="amenity"
                    value={amenity}
                    onChange={(e) => handleChange(e, index)}
                    required
                    sx={{ mt: 3 }}
                    fullWidth
                    label={`Amenity ${index + 1}`}
                    InputLabelProps={{ shrink: true }}
                  />
                  {index >= 0 && (
                    <Button
                      type="button"
                      variant="outlined"
                      color="error"
                      onClick={() => removeAmenity(index)}
                      sx={{
                        minHeight: 50,
                        maxWidth: 40,
                        marginLeft: 3,
                        marginTop: 3
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <div></div>
              <Button
                variant="outlined"
                color="success"
                type="button"
                onClick={addAmenity}
                sx={{ marginTop: 2 }}
              >
                Add Amenities
              </Button>
              <div>
                <div>
                  <TextField
                    type="text"
                    name="image"
                    value={formValues.image}
                    onChange={(e) =>
                      setFormValues({ ...formValues, image: e.target.value })
                    }
                    required
                    sx={{ mt: 3 }}
                    fullWidth
                    label="Image URL"
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-12">
                <Button type="submit" variant="contained" color="success">
                  Add Hotel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default AddHotel
