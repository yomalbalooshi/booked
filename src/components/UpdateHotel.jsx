import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UpdateCompanyHotel } from '../services/company'
import BookingContext from '../context/BookingContext'

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
    await UpdateCompanyHotel({
      id: hotel._id,
      name: formValues.name,
      description: formValues.description,
      amenities: formValues.amenities.filter(
        (amenity) => amenity.trim() !== ''
      ),
      companyId: user.id
    })
    navigate('/companyprofile')
    updateBooking()
  }

  return (
    user &&
    user.type === 'company' && (
      <div>
        <h1>Update Hotel</h1>
        {hotel && (
          <div>
            <p>{hotel.name}</p>
            <section>
              <form onSubmit={handleSubmit}>
                <label>Hotel Name: </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name || ''}
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
                  value={formValues.description || ''}
                  placeholder="Hotel Description"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      description: e.target.value
                    })
                  }
                  required
                />

                <br />

                <br />
                <label>Amenities: </label>
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
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addAmenity}>
                  Add More
                </button>
                <br />
                <button type="submit">Update Hotel</button>
              </form>
            </section>
          </div>
        )}
      </div>
    )
  )
}

export default UpdateHotel
