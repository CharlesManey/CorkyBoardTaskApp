import { useEffect, useState } from 'react';

function ProjectPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/projects/:projectId');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        
      }
    }
  })
}