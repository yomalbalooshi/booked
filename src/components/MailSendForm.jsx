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
    <div className="pb-10">
      <div className="shadow-2xl max-w-xl mx-auto flex justify-center pb-36 mt-10 mb-10 w-full text-center ">
        <form onSubmit={handleSubmit}>
          <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20 mb-4">
            Contact Us
          </h1>
          <div className="mb-7">
            <label className="text-xl" htmlFor="name">
              Company Name
            </label>
            <br />

            <input
              type="text"
              id="name"
              name="name"
              className="mt-5 w-full rounded-sm"
              placeholder="company name"
              value={formState.name}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="mb-7">
            <label className="text-xl" htmlFor="name">
              Email
            </label>
            <br />

            <input
              type="text"
              id="email"
              name="email"
              className="mt-5 w-full rounded-sm"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="mb-7">
            <label className="text-xl" htmlFor="messsage">
              Message
            </label>
            <br />

            <textarea
              type="text"
              id="message"
              name="message"
              className="mt-5 rounded-sm"
              rows={3}
              cols={40}
              placeholder="Message"
              value={formState.message}
              onChange={handleChange}
            ></textarea>
            <br />
          </div>
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
