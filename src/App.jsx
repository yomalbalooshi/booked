import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import About from './components/About'
import Home from './components/Home'
import Hotels from './components/Hotels'
import Profile from './components/Profile'
import SignIn from './components/SignIn'

const App = () => {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  )
}
export default App
