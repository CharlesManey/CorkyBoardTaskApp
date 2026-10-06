import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {

  return (
    <div className="bg-[url('src/assets/CorkBoard.jpg')] bg-cover bg-center h-screen w-full">
      <header className="bg-gray-600 min-w-screen sticky top-0 z-50 shadow-md">
        <h1 className="text-4xl font-bold text-amber-100 mb-2 pt-2 text-center">Corky Board</h1>
        <NavBar/>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage/>} />

        <Route path="/login" element={<LoginPage/>} />

        <Route path="/projects" element={<MyProjectsPage/>} />

        <Route path="/projects/:projectId" element={<ProjectDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App;
