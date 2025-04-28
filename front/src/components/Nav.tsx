import { NavLink, useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between px-4 py-2 bg-gray-300 absolute w-full fixed">
      <NavLink to="/" className="text-2xl px-8">To-do</NavLink>
      <div className="flex text-xl px-8">
        {token ? (
          <>
            <button onClick={handleLogout} className="text-red-600 cursor-pointer">Sair</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-gray-100 px-4">Login</NavLink>
            <NavLink to="/register" className="hover:text-gray-100 px-4">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
