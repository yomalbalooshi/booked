import { useState } from 'react'
import { SignInCustomer } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import SignInForm from './SignInForm'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInCustomer(formValues)
    setFormValues({ email: '', password: '' })
    setUser(payload)
    navigate('/')
  }

  return (
    <div>
      <SignInForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formValues={formValues}
      />
    </div>
  )
}
export default SignIn
