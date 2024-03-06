import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'

const UpdateProfile = ({ setUser, updateProfile, user }) => {
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
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    user && (
      <div>
        <div className="shadow-2xl max-w-xl mx-auto flex justify-center pb-36 mt-28 ">
          <form onSubmit={handleSubmit}>
            <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20 pb-16 ">
              Update Profile
            </h1>
            <div>
              <InputLabel htmlFor="password">Old Password</InputLabel>
              <OutlinedInput
                sx={{ width: 300, mb: 2 }}
                id="oldPassword"
                name="oldPassword"
                required
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </div>
            <div>
              <InputLabel htmlFor="password">New Password</InputLabel>
              <OutlinedInput
                sx={{ width: 300, mb: 2 }}
                id="newPassword"
                name="newPassword"
                required
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: 15 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!formValues.oldPassword || !formValues.newPassword}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default UpdateProfile
