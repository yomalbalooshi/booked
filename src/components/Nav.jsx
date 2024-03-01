import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let navOptions

  if (user && user.type === 'customer') {
    navOptions = (
      <div className="nav-links">
        <h6>Welcome {user.email}!</h6>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    )
  } else if (user && user.type === 'company') {
    navOptions = (
      <div className="nav-links">
        <h6>Welcome {user.email}!</h6>
        <NavLink to="/updatecompanyprofile">Profile</NavLink>
        <NavLink to="/Dashboard">Dashboard</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    )
  } else {
    navOptions = (
      <div className="nav-links">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </div>
    )
  }

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="" alt="logo" />
      </NavLink>
      {navOptions}
    </nav>
  )
}

export default Nav
