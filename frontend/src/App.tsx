import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { useAuth } from "./hooks/useAuth";
import corkBG from './assets/CorkBoard.jpg';
import headerBG from './assets/OakHeaderBG.jpg';


function RequireAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {

  return (
    <div
      style={{backgroundImage: `url(${corkBG})`}} 
      className="bg-cover bg-center bg-fixed min-h-screen w-full">
      <header 
      style={{backgroundImage: `url(${headerBG})`}}
      className="bg-cover bg-center w-full min-w-screen sticky top-0 z-50 shadow-sm shadow-black">
        <h1 className="text-5xl font-bold text-amber-100 mb-3 pt-2 text-center text-shadow-black text-shadow-md">Corky Board</h1>
        <NavBar/>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage/>} />

        <Route path="/login" element={<LoginPage/>} />

        <Route element={<RequireAuth />}>
          <Route path="/projects" element={<MyProjectsPage/>} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
