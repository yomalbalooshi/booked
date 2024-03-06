import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UpdateCompanyHotel } from '../services/company'
import BookingContext from '../context/BookingContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const UpdateHotel = ({ user }) => {
  let navigate = useNavigate()
  const { updateBooking } = useContext(BookingContext)
  const location = useLocation()
  const [hotel, setHotel] = useState({})
  const [formValues, setFormValues] = useState({
    amenities: ['']
  })

  useEffect(() => {
    const hotelObj = location.state.hotel
    setHotel(hotelObj)

    setFormValues({
      name: hotelObj.name,
      description: hotelObj.description,
      amenities: hotelObj.amenities
    })
  }, [])

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
    await UpdateCompanyHotel({
      id: hotel._id,
      name: formValues.name,
      description: formValues.description,
      amenities: formValues.amenities.filter(
        (amenity) => amenity.trim() !== ''
      ),
      companyId: user.id
    })

    updateBooking()
  }

  return (
    user &&
    user.type === 'company' && (
      <div>
        <div className="shadow-2xl max-w-3xl mx-auto flex justify-center pb-16 mt-32 mb-10 ">
          {hotel && (
            <form onSubmit={handleSubmit} className="update-hotel-form">
              <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20">
                Update Hotel
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
                <Button
                  variant="outlined"
                  color="success"
                  type="button"
                  onClick={addAmenity}
                  sx={{ marginTop: 2 }}
                >
                  Add Amenities
                </Button>

                <div className="flex justify-center mt-12">
                  <Button type="submit" variant="contained" color="success">
                    Update Hotel
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  )
}

export default UpdateHotel
