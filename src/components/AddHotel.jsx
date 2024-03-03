import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCompanyHotel } from '../services/company'

const AddHotel = ({ user }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    locationLong: '',
    locationLat: '',
    city: '',
    country: '',
    image: '',
    amenities: ['']
  })

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
    await addCompanyHotel({
      name: formValues.name,
      description: formValues.description,
      locationLong: formValues.locationLong,
      locationLat: formValues.locationLat,
      city: formValues.city,
      country: formValues.country,
      image: formValues.image,
      amenities: formValues.amenities.filter(
        (amenity) => amenity.trim() !== ''
      ),
      companyId: user.id
    })
    navigate('/')
  }

  return (
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
          <label>Longitude: </label>
          <input
            type="text"
            name="locationLong"
            value={formValues.locationLong}
            placeholder="Hotel Longitude"
            onChange={(e) =>
              setFormValues({ ...formValues, locationLong: e.target.value })
            }
            required
          />
          <br />
          <label>Latitude: </label>
          <input
            type="text"
            name="locationLat"
            value={formValues.locationLat}
            placeholder="Hotel Latitude"
            onChange={(e) =>
              setFormValues({ ...formValues, locationLat: e.target.value })
            }
            required
          />
          <br />
          <label>City: </label>
          <input
            type="text"
            name="city"
            value={formValues.city}
            placeholder="Hotel City"
            onChange={(e) =>
              setFormValues({ ...formValues, city: e.target.value })
            }
            required
          />
          <br />
          <label>Country: </label>
          <input
            type="text"
            name="country"
            value={formValues.country}
            placeholder="Hotel Country"
            onChange={(e) =>
              setFormValues({ ...formValues, country: e.target.value })
            }
            required
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
}

export default AddHotel
