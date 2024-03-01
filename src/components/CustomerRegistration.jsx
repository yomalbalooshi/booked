import { RegisterCustomer } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CustomerRegistation = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterCustomer({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            value={formValues.name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            value={formValues.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>
        <button
          disabled={
            !formValues.name ||
            !formValues.email ||
            !formValues.password ||
            !formValues.confirmPassword ||
            formValues.password !== formValues.confirmPassword
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default CustomerRegistation
