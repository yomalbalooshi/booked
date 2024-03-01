import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = ({ setUser, updateProfile }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await updateProfile(formValues)
    setFormValues({ oldPassword: '', newPassword: '' })
    setUser(payload)
    navigate('/')
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              onChange={handleChange}
              name="oldPassword"
              type="password"
              placeholder="Old Password"
              value={formValues.oldPassword}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="newPassword"
              value={formValues.newPassword}
              required
            />
          </div>
          <button disabled={!formValues.oldPassword || !formValues.newPassword}>
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
