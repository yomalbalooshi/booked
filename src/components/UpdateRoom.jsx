import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateCompanyHotelRoom } from '../services/company'
import { ShowRoom } from '../services/company'
import BookingContext from '../context/BookingContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const UpdateRoom = ({ user }) => {
  let navigate = useNavigate()
  const { updateBooking } = useContext(BookingContext)
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
    navigate(`/viewcompanyhotel/${room.hotelId}`)
    await UpdateCompanyHotelRoom({
      id: room._id,
      roomType: formValues.roomType,
      price: formValues.price,
      maxAdults: formValues.maxAdults,
      maxChildren: formValues.maxChildren,
      hotelId: hotelId,
      amenities: formValues.amenities.filter((amenity) => amenity.trim() !== '')
    })

    updateBooking()
  }

  return (
    user &&
    user.type === 'company' && (
      <div>
        <div className="shadow-2xl max-w-3xl mx-auto flex justify-center pb-16 mt-32 mb-10 ">
          <form className="update-hotel-form" onSubmit={handleSubmit}>
            <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20">
              Update Room
            </h1>
            <div>
              <div>
                <TextField
                  type="text"
                  name="roomType"
                  value={formValues.roomType}
                  onChange={(e) =>
                    setFormValues({ ...formValues, roomType: e.target.value })
                  }
                  required
                  sx={{ mt: 4 }}
                  fullWidth
                  label="Room Type"
                  InputLabelProps={{ shrink: true }}
                />
              </div>

              <div>
                <TextField
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={(e) =>
                    setFormValues({ ...formValues, price: e.target.value })
                  }
                  required
                  sx={{ mt: 3 }}
                  fullWidth
                  label="Price"
                  InputLabelProps={{ shrink: true }}
                />
              </div>

              {formValues.amenities.map((amenity, index) => (
                <div key={index} className="flex justify-between">
                  <TextField
                    type="text"
                    value={amenity}
                    onChange={(e) => handleChange(e, index)}
                    required
                    sx={{ mt: 3 }}
                    fullWidth
                    label={`Amenity ${index + 1}`}
                    InputLabelProps={{ shrink: true }}
                  />
                  {index > 0 && (
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

              <div>
                <TextField
                  type="number"
                  min="1"
                  name="maxAdults"
                  value={formValues.maxAdults}
                  onChange={(e) =>
                    setFormValues({ ...formValues, maxAdults: e.target.value })
                  }
                  required
                  sx={{ mt: 3 }}
                  fullWidth
                  label="Max Adults"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  min="0"
                  name="maxChildren"
                  value={formValues.maxChildren}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      maxChildren: e.target.value
                    })
                  }
                  required
                  sx={{ mt: 3 }}
                  fullWidth
                  label="Max Adults"
                  InputLabelProps={{ shrink: true }}
                />
              </div>

              <div className="flex justify-center mt-12">
                <Button type="submit" variant="contained" color="success">
                  Update Room
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
export default UpdateRoom
