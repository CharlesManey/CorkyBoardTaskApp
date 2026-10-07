import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import taskBG from '../assets/TaskBG.jpg';
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
    <div className=''>
      <div className='grid grid-cols-5 items-center w-full px-5'>
      <Link className='text-amber-100 text-shadow-black text-shadow-md text-lg justify-self-center
      hover:drop-shadow-sm 
    hover:drop-shadow-amber-900 
    hover:text-amber-600
      ' to="/projects">← Back to Projects</Link>

      <button className='border rounded-md border-black px-2 p-0.5 w-fit justify-self-center
      text-amber-100
      bg-green-900
      drop-shadow-md
      drop-shadow-black
      text-shadow-black text-shadow-md
      hover:drop-shadow-sm 
      hover:drop-shadow-amber-600 
      hover:text-amber-400
      '>Create Task +</button>

      <h2 className='text-amber-100 text-shadow-black text-shadow-md text-4xl pt-5 pb-10 font-semibold text-center'>{projectName}</h2>

      </div>
      {tasks.length === 0 ? (
        <p>No tasks found for this project yet.</p>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center text-amber-800">
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{backgroundImage: `url(${taskBG})`}}
              className="bg-cover bg-center w-50 h-50
              border p-5 pb-2 px-2 drop-shadow-black drop-shadow-md
              flex flex-col text-shadow-black text-shadow-xs
              "
            >
              <h3 className='text-lg'>{task.title}</h3>
              <hr />
              {task.description && <p className='text-sm wrap-break-word line-clamp-3'>{task.description}</p>}
              {task.status && <small className='mt-auto pb-1'>Status: {task.status}</small>}
              <div className='flex justify-between font-semibold'>
              <button className='
            text-shadow-black text-shadow-xs
              hover:text-lg
              hover:text-shadow-sm
              '>
                {task.status === 'To Do' ? '➡' : task.status === 'In Progress' ? '✅' : '↩️'} 
              </button>
              <button className='
              text-shadow-black text-shadow-xs
              hover:text-lg
              hover:text-shadow-sm
              '>✎</button>
              <button className='
              text-shadow-black text-shadow-xs
              hover:text-lg
              hover:text-shadow-sm
              '>🗑️</button>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;