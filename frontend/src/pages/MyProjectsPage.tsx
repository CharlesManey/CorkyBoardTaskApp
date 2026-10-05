import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div style={{ padding: '2rem' }}>
      <h2>My Projects</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {projects.map((project: any) => (
          <div 
            key={project._id} 
            style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', minWidth: '200px' }}
          >
            <h3>
              {/* Navigates to /projects/<projectId> */}
              <Link 
                to={`/projects/${project._id}`} style={{ textDecoration: 'none', color: '#0070f3' }}
                state={{ name: project.name }}
              >
                {project.name}
              </Link>
            </h3>
            {project.description && <p>{project.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyProjectsPage;