import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="" alt="logo" />
      </NavLink>
      <div className="nav-links">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/logout">Sign Out</NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </div>
    </nav>
  )
}

export default Nav
