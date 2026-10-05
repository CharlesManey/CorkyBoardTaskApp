import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status?: string;
}

function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const projectName = location.state?.name || 'Project Tasks';

  useEffect(() => {
    async function fetchProjectTasks() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to load tasks`);
        }

        const data = await response.json();
        setTasks(data);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchProjectTasks();
    }

  }, [projectId]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/projects">← Back to Projects</Link>
      <h2>{projectName}</h2>

      {tasks.length === 0 ? (
        <p>No tasks found for this project yet.</p>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: '1px solid black',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#fefabc', // Corkboard note styling
                width: '200px',
                boxShadow: '2px 3px 2px black',
              }}
            >
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              {task.status && <small>Status: {task.status}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;