import { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addCompanyHotelRoom } from '../services/company'
import BookingContext from '../context/BookingContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AddRoom = ({ user }) => {
  let navigate = useNavigate()
  const { updateBooking } = useContext(BookingContext)
  let { id } = useParams()
  const [formValues, setFormValues] = useState({
    roomType: '',
    price: 0,
    amenities: [''],
    images: [''],
    maxAdults: 0,
    maxChildren: 0
  })

  const handleChange = (e, index) => {
    const updatedAmenities = [...formValues.amenities]
    updatedAmenities[index] = e.target.value
    setFormValues({ ...formValues, amenities: updatedAmenities })
  }
  const handleImageChange = (e, index) => {
    const updatedImages = [...formValues.images]
    updatedImages[index] = e.target.value
    setFormValues({ ...formValues, images: updatedImages })
  }
  const addImage = () => {
    setFormValues({ ...formValues, images: [...formValues.images, ''] })
  }
  const addAmenity = () => {
    setFormValues({ ...formValues, amenities: [...formValues.amenities, ''] })
  }
  const removeImage = (index) => {
    if (formValues.images.length > 1) {
      const updatedImages = [...formValues.images]
      updatedImages.splice(index, 1)
      setFormValues({ ...formValues, images: updatedImages })
    }
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
    navigate(`/hotels/${id}`)
    await addCompanyHotelRoom({
      roomType: formValues.roomType,
      price: formValues.price,
      maxAdults: formValues.maxAdults,
      maxChildren: formValues.maxChildren,
      amenities: formValues.amenities.filter(
        (amenity) => amenity.trim() !== ''
      ),
      images: formValues.images.filter((image) => image.trim() !== ''),
      hotelId: id
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
              Add Room
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
                  placeholder="Room Price"
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
              <div>
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
              </div>

              <div>
                {formValues.images.map((image, index) => (
                  <div key={index} className="flex justify-between">
                    <TextField
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(e, index)}
                      required
                      sx={{ mt: 3 }}
                      fullWidth
                      label={`Image ${index + 1}`}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={() => removeImage(index)}
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
                  onClick={addImage}
                  sx={{ marginTop: 2 }}
                >
                  Add Images
                </Button>
              </div>

              <div>
                <TextField
                  type="number"
                  min="1"
                  name="maxAdults"
                  value={formValues.maxAdults}
                  placeholder="Max Number of Adults"
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
                  placeholder="Max Number of Children"
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
                  Add Room
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
export default AddRoom
