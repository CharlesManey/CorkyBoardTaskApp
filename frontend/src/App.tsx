import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import CorkBoard from "./assets/CorkBoard.jpg";

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
        {/* <Route path="/projects/:projectId" element={<ProjectPage/>} /> */}
      </Routes>
    </div>
  )
}

export default App
