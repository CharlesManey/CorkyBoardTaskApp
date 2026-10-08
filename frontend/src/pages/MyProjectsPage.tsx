import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import corkBG from '../assets/CorkBoard.jpg';

interface Project {
  _id: string;
  name: string;
  description?: string;
}

function MyProjectsPage() {
  // States
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error , setError] = useState<string | null>(null);
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<{ name: string; description: string }>({ name: '', description: '' });
  // Auth Headers Helper
  const getAuthHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });
  // Fetch Projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects', {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch projects`);
        }

        const data: Project[] = await response.json();
        setProjects(data);

      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch projects';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({ name: project.name, description: project.description || '' });
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({ name: '', description: '' });
  };

  // Submit Handler for Edit and Create
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim()) return;

    try {
      // Edit Project
      if (editingProject) {
        const response = await fetch(`/api/projects/${editingProject._id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update project');
        const updatedProject: Project = await response.json();

        setProjects((prev) => 
        prev.map((p) => (p._id === editingProject._id ? updatedProject : p))
        );
      } else {
        // Create Project
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to create project');
        const newProject: Project = await response.json();

        setProjects((prev) => [...prev, newProject]);
      }

      handleCloseModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert(message);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to delete project');
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert(message);
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className='text-amber-100 text-shadow-md text-shadow-black flex flex-col items-center'>
      <div className='grid grid-cols-3 items-center w-full'>
        <Link className='text-amber-100 text-shadow-black text-shadow-md text-lg justify-self-center
        hover:drop-shadow-sm 
      hover:drop-shadow-amber-900 
      hover:text-amber-600' 
        to="/">← Back to Home</Link>

        <h2 className='text-4xl pt-5 pb-10 font-semibold text-center'>My Projects</h2>
        
        <button onClick={handleOpenCreateModal}
        className='border rounded-md border-black px-2 p-0.5 w-fit justify-self-center
        bg-green-900
        drop-shadow-md
        drop-shadow-black
        text-shadow-black text-shadow-md
        hover:drop-shadow-sm 
        hover:drop-shadow-amber-600 
        hover:text-amber-400
        '>Create Project +</button>
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {projects.map((project: Project) => (
          <div 
            key={project._id}
            style={{backgroundImage: `url(${corkBG})`}}
            className="bg-cover bg-center
            border-4 border-[#C0C0C0] p-5 rounded-md w-11/12 sm:w-100 drop-shadow-black drop-shadow-md
            hover:border-amber-400"
          >
            <h3 className='text-3xl pb-3 font-semibold'>
              {/* Navigates to /projects/<projectId> */}
              <Link 
                className='
                hover:drop-shadow-sm 
              hover:drop-shadow-amber-900 
              hover:text-amber-600'
                to={`/projects/${project._id}`}
                state={{ name: project.name }}
              >
                {project.name}
              </Link>
            </h3>
            {project.description && <p className='pb-3'>{project.description}</p>}
            <div className='flex justify-between pt-2 font-semibold'>
              <button onClick={() => handleOpenEditModal(project)}
              className='border rounded-lg border-black px-2 p-0.5
              bg-amber-900
              drop-shadow-md
              drop-shadow-black
              text-shadow-black text-shadow-md
              hover:drop-shadow-sm 
              hover:drop-shadow-amber-600 
              hover:text-amber-400
              '>Edit ✎</button>
              <button onClick={() => handleDeleteProject(project._id)}
              className='border rounded-md border-black px-2 p-0.5
              bg-amber-900
              drop-shadow-md
              drop-shadow-black
              text-shadow-black text-shadow-md
              hover:drop-shadow-sm 
              hover:drop-shadow-amber-600 
              hover:text-amber-400
              '>Delete 🗑️</button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-amber-950 border-2 border-amber-600 p-6 rounded-lg w-11/12 max-w-md shadow-2xl text-amber-100">
            <h3 className="text-2xl font-bold mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 rounded bg-amber-900/50 border border-amber-700 text-amber-100 focus:outline-none focus:border-amber-400"
                  placeholder="Enter a Project Name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 rounded bg-amber-900/50 border border-amber-700 text-amber-100 focus:outline-none focus:border-amber-400"
                  placeholder="Optional details..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-1.5 rounded border border-amber-700 text-amber-300 hover:bg-amber-900/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-green-900 border border-black hover:bg-green-800 text-amber-100 font-semibold"
                >
                  {editingProject ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjectsPage;