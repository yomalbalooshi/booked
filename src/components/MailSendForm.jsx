import { useState } from 'react'
import './MailSendForm.css'
import axios from 'axios'

const MailSendForm = () => {
  const initialState = {
    name: '',
    email: '',
    message: ''
  }

  const [formState, setFormState] = useState(initialState)
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const messageHtml = 'test message html'

    axios({
      method: 'POST',
      url: 'http://localhost:3000/mail/send',
      data: {
        name: formState.name,
        email: formState.email,
        messageHtml: formState.message
      }
    }).then((response) => {
      if (response) {
        console.log('response is ==> ', response)
      }
    })
    setFormState(initialState)
  }

  return (
    <div>
      <div>Contact Us</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="company name"
            value={formState.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Emai</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
          />
          <label htmlFor="messsage">Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            placeholder="Message"
            value={formState.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            disabled={
              formState.message === '' ||
              formState.email === '' ||
              formState.name === ''
            }
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default MailSendForm
