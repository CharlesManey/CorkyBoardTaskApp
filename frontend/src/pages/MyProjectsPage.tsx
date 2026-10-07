import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import corkBG from '../assets/CorkBoard.jpg';

function MyProjectsPage() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error , setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch projects`);
        }

        const data = await response.json();
        setProjects(data);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className='text-amber-100 text-shadow-md text-shadow-black flex flex-col items-center'>
      <div className='grid grid-cols-3 items-center w-full'>
        <button className='border rounded-md border-black px-2 p-0.5 w-fit justify-self-center
        bg-green-900
        drop-shadow-md
        drop-shadow-black
        text-shadow-black text-shadow-md
        hover:drop-shadow-sm 
        hover:drop-shadow-amber-600 
        hover:text-amber-400
        '>Create Project +</button>
        <h2 className='text-4xl pt-5 pb-10 font-semibold text-center'>My Projects</h2>
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {projects.map((project: any) => (
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
              <button className='border rounded-lg border-black px-2 p-0.5
              bg-amber-900
              drop-shadow-md
              drop-shadow-black
              text-shadow-black text-shadow-md
              hover:drop-shadow-sm 
              hover:drop-shadow-amber-600 
              hover:text-amber-400
              '>Edit ✎</button>
              <button className='border rounded-md border-black px-2 p-0.5
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
    </div>
  )
}

export default MyProjectsPage;