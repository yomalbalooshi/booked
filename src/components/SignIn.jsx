import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MailIcon from '@mui/icons-material/Mail'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const SignIn = ({ setUser, signin }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await signin(formValues)
    setFormValues({ email: '', password: '' })
    setUser(payload)
    navigate('/')
  }
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <div>
        <Box
          sx={{
            '& > :not(style)': {
              mx: 'auto',
              width: '25ch',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
          autoComplete="off"
        >
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="email"
                name="email"
                type={'email'}
                required
                onChange={handleChange}
                sx={{ width: 300, mb: 3, mt: 15 }}
                label="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                sx={{ width: 300, mb: 2 }}
                id="password"
                name="password"
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

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!formValues.email || !formValues.password}
            >
              Log In
            </Button>
          </form>
        </Box>
      </div>
    </div>
  )
}
export default SignIn
