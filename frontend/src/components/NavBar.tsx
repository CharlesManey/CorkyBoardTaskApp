import { NavLink, useNavigate } from "react-router-dom";

function NavBar (){
  const 
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <nav>
      <NavLink
      to="/"
      >Home</NavLink>
    </nav>
  )
}