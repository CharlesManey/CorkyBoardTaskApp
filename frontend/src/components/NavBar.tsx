import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function NavBar() {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className="flex justify-center gap-5 pb-2.5 text-shadow-lg font-semibold">
      <NavLink
      to="/"
      className={({isActive}) => isActive ? 'text-amber-400 text-shadow-black text-shadow-md' : 'text-amber-100 hover:text-lg text-shadow-black text-shadow-md'}
      >Home</NavLink>
      {isAuthenticated && (
      <NavLink
      to="/projects"
      className={({isActive}) => isActive ? 'text-amber-400 text-shadow-black text-shadow-md' : 'text-amber-100 hover:text-lg text-shadow-black text-shadow-sm'}
      >Projects</NavLink>
      )}
      {isAuthenticated ? 
      <button className="text-amber-100 border rounded-md border-black px-2 p-0.5 
      bg-amber-900
      drop-shadow-md
      drop-shadow-black
      text-shadow-black text-shadow-md
      hover:drop-shadow-sm 
      hover:drop-shadow-amber-600 
      hover:text-amber-400"
      type="button"
      onClick={onLogout}>Logout</button>
      : <NavLink 
      to='/login'
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Login</NavLink>}
    </nav>
  )
}

export default NavBar;