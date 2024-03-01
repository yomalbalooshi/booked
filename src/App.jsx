import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Nav from './components/Nav'
import About from './components/About'
import Home from './components/Home'
import Hotels from './components/Hotels'
import Profile from './components/Profile'
import CustomerRegistation from './components/CustomerRegistration'
import {
  CheckSession,
  SignInCustomer,
  SignInCompany,
  UpdateCustomerProfile,
  UpdateCompanyProfile
} from './services/Auth'
import SignIn from './components/SignIn'
import UpdateProfile from './components/UpdateProfile'

const App = () => {
  const [user, setUser] = useState(null)

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

  return (
    <div className="App">
      <header>
        <Nav user={user} handleLogOut={handleLogOut} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/register" element={<CustomerRegistation />} />
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
              />
            }
          />
          <Route
            path="/updatecompanyprofile"
            element={
              <UpdateProfile
                setUser={setUser}
                updateProfile={UpdateCompanyProfile}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
export default App
