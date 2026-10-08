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
  // Params
  const { projectId } = useParams<{ projectId: string }>();
  // States
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State to carry over name
  const location = useLocation();
  const projectName = location.state?.name || 'Project Tasks';
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<{ title: string; description: string }>({ title: '', description: '' });
  // Auth Headers Helper
  const getAuthHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });
  // Fetch Project Tasks
  useEffect(() => {
    async function fetchProjectTasks() {
      try {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch project tasks`);
        }

        const data: Task[] = await response.json();
        setTasks(data);

      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch project tasks';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchProjectTasks();
    }

  }, [projectId]);

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '' });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description || '' });
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({ title: '', description: '' });
  };

  // Handle Status
  const handleStatusChange = async (task: Task) => {
    const currentStatus = task.status || 'To Do';
    const nextStatus = currentStatus === 'To Do'
      ? 'In Progress'
      : currentStatus === 'In Progress'
        ? 'Done'
        : 'To Do';

    const taskId = task._id;

    try {
      const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) throw new Error('Failed to update task status');
      const updatedTask: Task = await response.json();

      setTasks((prev) => 
      prev.map((t) => (t._id === taskId ? updatedTask : t))
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update status';
      alert(message);
    }
  };

  // Submit Handler for Edit and Create
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.title.trim()) return;

    try {
      // Edit Task
      if (editingTask) {
        const response = await fetch(`/api/projects/${projectId}/tasks/${editingTask._id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update task');
        const updatedTask: Task = await response.json();

        setTasks((prev) => 
        prev.map((t) => (t._id === editingTask._id ? updatedTask : t))
        );
      } else {
        // Create Task
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to create task');
        const newTask: Task = await response.json();

        setTasks((prev) => [...prev, newTask]);
      }

      handleCloseModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert(message);
    }
  };

  // Delete Project
  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert(message);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className=''>
      <div className='grid grid-cols-3 items-center w-full px-5'>
      <Link className='text-amber-100 text-shadow-black text-shadow-md text-lg justify-self-center
      hover:drop-shadow-sm 
    hover:drop-shadow-amber-900 
    hover:text-amber-600
      ' to="/projects">← Back to Projects</Link>

      <h2 className='text-amber-100 text-shadow-black text-shadow-md text-4xl pt-5 pb-10 font-semibold text-center'>{projectName}</h2>

      <button onClick={handleOpenCreateModal}
      className='border rounded-md border-black px-2 p-0.5 w-fit justify-self-center
      text-amber-100
      bg-green-900
      drop-shadow-md
      drop-shadow-black
      text-shadow-black text-shadow-md
      hover:drop-shadow-sm 
      hover:drop-shadow-amber-600 
      hover:text-amber-400
      '>Create Task +</button>


      </div>
      {tasks.length === 0 ? (
        <p className='
        flex justify-center items-center min-h-[60vh]
        text-amber-100 text-3xl
        text-shadow-black text-shadow-md
        '>No tasks found for this project yet...</p>
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
              <h3 className={`text-lg ${task.status === 'Done' ? 'line-through opacity-50' : ''}`}>{task.title}</h3>
              <hr className={`${task.status === 'Done' ? 'opacity-50' : ''}`} />
              {task.description && <p className={`text-sm wrap-break-word line-clamp-3 ${task.status === 'Done' ? 'line-through opacity-50' : ''}`}>{task.description}</p>}
              {task.status && <small className={`mt-auto pb-1 ${task.status === 'Done' ? 'opacity-50' : ''}`}>Status: {task.status}</small>}
              <div className='flex justify-between font-semibold'>
              <button onClick={() => handleStatusChange(task)}
              className='text-shadow-black text-shadow-xs
              hover:text-lg
              hover:text-shadow-sm
              '>
                {task.status === 'To Do' ? '➡Start ' : task.status === 'In Progress' ? '✅Finish' : '↩️Undo'} 
              </button>
              <button onClick={() => handleOpenEditModal(task)}
              className='text-shadow-black text-shadow-xs
              hover:text-lg
              hover:text-shadow-sm
              '>✎</button>
              <button onClick={() => handleDeleteTask(task._id)}
              className='text-shadow-black text-shadow-xs
              hover:text-lg
              hover:text-shadow-sm
              '>🗑️</button>
            </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-amber-950 border-2 border-amber-600 p-6 rounded-lg w-11/12 max-w-md shadow-2xl text-amber-100">
            <h3 className="text-2xl font-bold mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 rounded bg-amber-900/50 border border-amber-700 text-amber-100 focus:outline-none focus:border-amber-400"
                  placeholder="Enter a Task Title..."
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
                  placeholder="Optional instructions..."
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
                  {editingTask ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;