import { useState } from 'react'
import './ReviewForm.css'
// import axios from 'axios'
import { addHotelReview } from '../services/reviews'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
const ReviewForm = ({ user, hotelId, callback }) => {
  const initialState = {
    feedback: '',
    rating: ''
  }
  const [value, setValue] = useState(0)
  const [formState, setFormState] = useState(initialState)
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      feedback: formState.feedback,
      rating: value,
      customerId: user.id
    }

    const addReview = async (hotelId, data) => {
      await addHotelReview(hotelId, data)
      callback()
    }

    addReview(hotelId, data)
    setFormState(initialState)
    setValue(0)
  }

  return (
    <div>
      <div className="s max-w-3xl mx-auto flex justify-center pb-16 mt-10 mb-10 ">
        {
          <form onSubmit={handleSubmit} className="update-hotel-form">
            <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20">
              Your Feedback
            </h1>
            <div>
              <div className="flex justify-center mt-10">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                  }}
                  required
                />
              </div>
              <div>
                <TextField
                  type="text"
                  id="feedback"
                  name="feedback"
                  placeholder="Feedback"
                  value={formState.feedback}
                  onChange={handleChange}
                  required
                  sx={{ mt: 4 }}
                  fullWidth
                  label="Review"
                />
              </div>

              <div className="flex justify-center mt-12">
                <Button type="submit" variant="contained" color="success">
                  Submit Review
                </Button>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  )
}

export default ReviewForm
