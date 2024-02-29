import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Nav from './components/Nav'
import About from './components/About'
import Home from './components/Home'
import Hotels from './components/Hotels'
import Profile from './components/Profile'
import CustomerSignIn from './components/CustomerSignIn'
import CompanySignIn from './components/CompanySignIn'
import CustomerRegistation from './components/CustomerRegistration'
import { CheckSession } from './services/Auth'

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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/login" element={<CustomerSignIn setUser={setUser} />} />
          <Route path="/register" element={<CustomerRegistation />} />
          <Route
            path="/companylogin"
            element={<CompanySignIn setUser={setUser} />}
          />
        </Routes>
      </main>
    </div>
  )
}
export default App
