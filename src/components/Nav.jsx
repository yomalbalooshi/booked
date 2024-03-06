import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let navOptions

  if (user && user.type === 'customer') {
    navOptions = (
      <div>
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    )
  } else if (user && user.type === 'company') {
    navOptions = (
      <div>
        <NavLink to={`/Dashboard/${user.id}`}>Dashboard</NavLink>
        <NavLink to="/companyprofile">Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    )
  } else {
    navOptions = (
      <div>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </div>
    )
  }

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="" alt="logo" />
      </NavLink>
      <div className="nav-links">
        <NavLink to="/about">About</NavLink>
        {navOptions}
      </div>
    </nav>
  )
}

export default Nav
