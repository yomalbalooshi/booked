import './App.css'

import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Nav from './components/Nav'
import About from './components/About'
import Home from './components/Home'
import Hotels from './components/Hotels'
import Profile from './components/Profile'
import CustomerRegistation from './components/CustomerRegistration'
import UpdateHotel from './components/UpdateHotel'
import CompanyViewHotel from './components/CompanyViewHotel'
import AddRoom from './components/AddRoom'
import {
  CheckSession,
  SignInCustomer,
  SignInCompany,
  UpdateCustomerProfile,
  UpdateCompanyProfile
} from './services/Auth'
import SignIn from './components/SignIn'
import UpdateProfile from './components/UpdateProfile'
import CompanyProfile from './components/CompanyProfile'
import AddHotel from './components/AddHotel'
import HotelDetails from './components/HotelDetails'
import Booking from './components/Booking'

import UpdateRoom from './components/UpdateRoom'
import Dashboard from './components/Dashboard'
import UpdateBooking from './components/UpdateBooking'
import Map from './components/Map'
import AllBookings from './components/AllBookings'

const App = () => {
  const [user, setUser] = useState(null)
  const [booked, setBooked] = useState(false)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }
  // console.log(user)
  const theme = createTheme({
    direction: 'ltr'
    // other theme properties
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <Nav user={user} handleLogOut={handleLogOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route
              path="/hotels/:id"
              element={<HotelDetails user={user} booked={booked} />}
            />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/register" element={<CustomerRegistation />} />
            <Route
              path="/booking/:id"
              element={
                <Booking user={user} booked={booked} setBooked={setBooked} />
              }
            />
            <Route
              path="/login"
              element={<SignIn setUser={setUser} signin={SignInCustomer} />}
            />
            <Route
              path="/companylogin"
              element={<SignIn setUser={setUser} signin={SignInCompany} />}
            />
            <Route
              path="/updateprofile"
              element={
                <UpdateProfile
                  setUser={setUser}
                  updateProfile={UpdateCustomerProfile}
                  user={user}
                />
              }
            />
            <Route
              path="/companyprofile"
              element={<CompanyProfile user={user} />}
            />
            <Route path="/addHotel" element={<AddHotel user={user} />} />
            <Route
              path="/updatecompanyprofile"
              element={
                <UpdateProfile
                  setUser={setUser}
                  updateProfile={UpdateCompanyProfile}
                />
              }
            />
            <Route
              path="/viewcompanyhotel/:id"
              element={<CompanyViewHotel user={user} />}
            />
            <Route path="/addRoom/:id" element={<AddRoom user={user} />} />
            <Route path="/updatehotel" element={<UpdateHotel user={user} />} />
            <Route
              path="/updatebooking/:id"
              element={<UpdateBooking user={user} />}
            />
            <Route path="/map" element={<Map />} />
            <Route path="/Dashboard/:id" element={<Dashboard user={user} />} />
            <Route
              path="/allbookings/:id"
              element={<AllBookings user={user} />}
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}
export default App
