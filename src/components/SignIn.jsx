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
import Button from '@mui/material/Button'

import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const SignIn = ({ setUser, signin }) => {
  let navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await signin(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)
      navigate('/')
    } catch (error) {
      handleClickOpen()
    }
  }
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <div className="shadow-2xl max-w-xl mx-auto flex justify-center pb-36 mt-32 ">
        <form onSubmit={handleSubmit}>
          <h1 className="mx-auto max-w-max font-bold font text-4xl pt-20">
            Sign In
          </h1>
          <div>
            <TextField
              id="email"
              name="email"
              type={'email'}
              required
              onChange={handleChange}
              sx={{ width: 300, mb: 3, mt: 8 }}
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
          <div style={{ textAlign: 'center', marginTop: 15 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!formValues.email || !formValues.password}
            >
              Log In
            </Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Log In Error
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Typography gutterBottom>
                  The provided credentials don't match an account in our system.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  ok
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignIn
