import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let navOptions

  if (user && user.type === 'customer') {
    navOptions = (
      <div className="flex justify-center">
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    )
  } else if (user && user.type === 'company') {
    navOptions = (
      <div className="flex justify-center">
        <NavLink to={`/allbookings/${user.id}`}>All Bookings</NavLink>
        <NavLink to={`/Dashboard/${user.id}`}>Dashboard</NavLink>
        <NavLink to="/companyprofile">Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    )
  } else {
    navOptions = (
      <div className="flex justify-center">
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </div>
    )
  }

  return (
    <nav className="navbar font-extralight text-2xl">
      <NavLink to="/">
        <div className="mt-10">
          {' '}
          <img src="images/logo.png" alt="logo" className="max-w-48 " />
        </div>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/map">Discover</NavLink>
        {navOptions}
      </div>
    </nav>
  )
}

export default Nav
