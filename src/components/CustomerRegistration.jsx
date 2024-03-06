import { RegisterCustomer } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetCities } from '../services/city'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const CustomerRegistation = () => {
  const navigate = useNavigate()
  const [cities, setCities] = useState({})
  const [nationality, setNationality] = useState('')
  const [gender, setGender] = useState('')
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'female',
    confirmPassword: ''
  })

  useEffect(() => {
    const getAllCities = async () => {
      let response = await GetCities()
      setCities(response)
    }
    getAllCities()
  }, [])

  let countries = []
  if (Object.keys(cities).length !== 0) {
    cities.forEach((city) => {
      if (!countries.includes(city.country)) {
        countries.push(city.country)
      }
    })
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterCustomer({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      gender: gender,
      nationality: nationality
    })
    setFormValues({
      name: '',
      email: '',
      password: '',
      gender: '',
      confirmPassword: ''
    })
    navigate('/login')
  }
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <div className="shadow-2xl max-w-xl mx-auto flex justify-center pb-36 mt-32 ">
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
            <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20">
              Register
            </h1>
            <div>
              <TextField
                id="name"
                name="name"
                onChange={handleChange}
                required
                sx={{ width: 300, mt: 10, mb: 3 }}
                label="Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </div>

            <div>
              <TextField
                id="email"
                name="email"
                required
                type={'email'}
                onChange={handleChange}
                sx={{ width: 300, mb: 3 }}
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
              <Autocomplete
                disablePortal
                options={['Female', 'Male']}
                sx={{ width: 300, mb: 3 }}
                onChange={(e, value) => setGender(value)}
                required
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    id="gender"
                    name="gender"
                  />
                )}
              />
            </div>
            <div>
              <Autocomplete
                disablePortal
                options={countries}
                sx={{ width: 300, mb: 2 }}
                onChange={(e, value) => setNationality(value)}
                required
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nationality"
                    id="country"
                    name="country"
                  />
                )}
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

            <div>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                sx={{ width: 300, mb: 3 }}
                id="confirmPassword"
                name="confirmPassword"
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
              disabled={
                !formValues.name ||
                !formValues.email ||
                !formValues.password ||
                !formValues.confirmPassword ||
                formValues.password !== formValues.confirmPassword
              }
            >
              Register
            </Button>
          </form>
        </Box>
      </div>
    </div>
  )
}

export default CustomerRegistation
