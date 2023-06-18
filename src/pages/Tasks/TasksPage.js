import React, { useEffect, useState } from 'react';
import TaskForm from './TasksForm';
import TaskList from './TasksList';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (searchParams = {}) => {
    try {
      const searchQuery = new URLSearchParams(searchParams).toString();
      const response = await fetch(`https://rocky-temple-83495.herokuapp.com/tasks?${searchQuery}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await fetch('https://rocky-temple-83495.herokuapp.com/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Failed to create task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
    <h1>Tasks</h1>
    <TaskForm onCreate={createTask} />
    <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} onSearch={fetchTasks} />
  </div>
  );
};

export default TasksPage;
