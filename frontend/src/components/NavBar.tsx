import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  }
  
  return (
    <nav className="flex justify-center gap-5 pb-2.5">
      <NavLink
      to="/"
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Home</NavLink>
      <NavLink
      to="/projects"
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Projects</NavLink>
      {isAuthenticated ? 
      <button className="text-amber-100 border rounded-md border-black px-2 p-0.5 
      bg-amber-900 
      hover:drop-shadow-sm 
      hover:drop-shadow-amber-600 
      hover:text-amber-400" 
      onClick={onLogout}>Sign Out</button>
      : <NavLink 
      to='/login'
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Login</NavLink>}
    </nav>
  )
}

export default NavBar;