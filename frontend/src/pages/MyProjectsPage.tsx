import { useEffect, useState } from 'react';

function MyProjectsPage() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project: any) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default MyProjectsPage;