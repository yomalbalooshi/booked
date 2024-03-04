import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateCompanyHotelRoom } from '../services/company'
import { ShowRoom } from '../services/company'
const UpdateRoom = () => {
  let navigate = useNavigate()

  let { id } = useParams()

  const [room, setRoom] = useState({})
  const [hotelId, setHotelId] = useState({})

  const [formValues, setFormValues] = useState({
    roomType: '',
    price: '',
    maxAdults: '',
    maxChildren: '',
    amenities: ['']
  })
  useEffect(() => {
    const getRoomDetails = async () => {
      let response = await ShowRoom(id)
      setRoom(response)
    }
    getRoomDetails()
  }, [])
  useEffect(() => {
    if (room && Object.keys(room).length > 0) {
      setHotelId(room.hotelId)
      setFormValues({
        roomType: room.roomType,
        price: room.price,
        maxAdults: room.maxAdults,
        maxChildren: room.maxChildren,
        amenities: room.amenities
      })
    }
  }, [room])

  const handleChange = (e, index) => {
    console.log('handleChange', e.target.name, e.target.value)
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
    console.log('form values before update:', formValues)
    await UpdateCompanyHotelRoom({
      id: room._id,
      roomType: formValues.roomType,
      price: formValues.price,
      maxAdults: formValues.maxAdults,
      maxChildren: formValues.maxChildren,
      hotelId: hotelId,
      amenities: formValues.amenities.filter((amenity) => amenity.trim() !== '')
    })
    navigate('/')
  }
  console.log(room)
  return (
    <div>
      <h1>update room</h1>
      <div>
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
          <button type="submit">Update Room</button>
        </form>
      </div>
    </div>
  )
}
export default UpdateRoom
