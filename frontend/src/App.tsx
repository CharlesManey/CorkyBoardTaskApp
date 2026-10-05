import { Route, Routes } from "react-router-dom";
import CorkBoard from "./assets/CorkBoard.jpg";
import LandingPage from "./pages/LandingPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {
  const containerStyle = {
    // Wrap the imported image variable in template literals inside url()
    backgroundImage: `url(${CorkBoard})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%'
  };
  return (
    <div style={containerStyle}>
      <header>

      </header>

      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/projects" element={<MyProjectsPage/>} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App
