import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addCompanyHotelRoom } from '../services/company'
const AddRoom = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [formValues, setFormValues] = useState({
    roomType: '',
    price: 0,
    amenities: [''],
    maxAdults: 0,
    maxChildren: 0
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
    await addCompanyHotelRoom({
      roomType: formValues.roomType,
      price: formValues.price,
      maxAdults: formValues.maxAdults,
      maxChildren: formValues.maxChildren,
      amenities: formValues.amenities.filter(
        (amenity) => amenity.trim() !== ''
      ),
      hotelId: id
    })
    navigate('/')
  }
  // console.log(id)
  return (
    user &&
    user.type === 'company' && (
      <div>
        <h1>Add a Room</h1>
        <form onSubmit={handleSubmit}>
          <label>Room Type: </label>
          <input
            type="text"
            name="roomType"
            value={formValues.roomType}
            placeholder="Room Type"
            onChange={(e) =>
              setFormValues({ ...formValues, roomType: e.target.value })
            }
            required
          />
          <br />
          <label>Price per night: </label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            placeholder="Room Price"
            onChange={(e) =>
              setFormValues({ ...formValues, price: e.target.value })
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
          <label>Maximum Number of Adults </label>
          <input
            type="number"
            min="1"
            name="maxAdults"
            value={formValues.maxAdults}
            placeholder="Max Number of Adults"
            onChange={(e) =>
              setFormValues({ ...formValues, maxAdults: e.target.value })
            }
            required
          />
          <br />
          <label>Maximum Number of Children </label>
          <input
            type="number"
            min="0"
            name="maxChildren"
            value={formValues.maxChildren}
            placeholder="Max Number of Children"
            onChange={(e) =>
              setFormValues({ ...formValues, maxChildren: e.target.value })
            }
            required
          />
          <br />
          <button type="submit">Add Room</button>
        </form>
      </div>
    )
  )
}
export default AddRoom
