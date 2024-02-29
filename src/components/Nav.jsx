import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  console.log(user)
  let customerOptions
  let companyOptions

  let navOptions

  if (user && user.type === 'customer') {
    navOptions = (
      <nav>
        <h6>Welcome {user.email}!</h6>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </nav>
    )
  } else if (user && user.type === 'company') {
    navOptions = (
      <nav>
        <h6>Welcome {user.email}!</h6>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/profile">Dashboard</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </nav>
    )
  } else {
    navOptions = (
      <nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </nav>
    )
  }

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="" alt="logo" />
      </NavLink>
      <div className="nav-links">{navOptions}</div>
    </nav>
  )
}

export default Nav
