import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
        <NavLink to="/" end>Home</NavLink>
        <div>
        <NavLink to="login">Login</NavLink>
        <NavLink to="register">Register</NavLink>
        </div>
    </nav>
  )
}

export default Nav