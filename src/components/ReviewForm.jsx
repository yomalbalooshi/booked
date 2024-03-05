import { useState } from 'react'
import './ReviewForm.css'
import axios from 'axios'
import { addHotelReview } from '../services/reviews'

const ReviewForm = ({ user, hotelId, callback }) => {
  const initialState = {
    feedback: '',
    rating: ''
  }

  const [formState, setFormState] = useState(initialState)
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      feedback: formState.feedback,
      rating: formState.rating,
      customerId: user.id
    }

    const addReview = async (hotelId, data) => {
      await addHotelReview(hotelId, data)
      callback()
    }

    addReview(hotelId, data)
    setFormState(initialState)
  }

  return (
    <div>
      <div>Your Feedback</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder="Feedback"
            value={formState.feedback}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            // placeholder="company name"
            value={formState.rating}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={formState.feedback === '' || formState.rating === ''}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
