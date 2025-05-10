import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createTask, getTasks, updateTask, deleteTask } from '../services/api';
import { initializeSocket } from '../services/socket';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTasks(user.token);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initialize socket and fetch tasks on component mount
  useEffect(() => {
    if (user) {
      fetchTasks();

      // Initialize socket connection
      const socket = initializeSocket();

      // Socket event handlers
      socket.on('taskCreated', (newTask) => {
        setTasks(prev => [newTask, ...prev]);
      });

      socket.on('taskUpdated', (updatedTask) => {
        setTasks(prev =>
          prev.map(task => task._id === updatedTask._id ? updatedTask : task)
        );
      });

      socket.on('taskDeleted', (deletedTaskId) => {
        setTasks(prev => prev.filter(task => task._id !== deletedTaskId));
      });

      // Cleanup function
      return () => {
        socket.disconnect();
      };
    }
  }, [user, fetchTasks]);

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    try {
      setFormLoading(true);
      await createTask(taskData, user.token);
      setError(null);
      // No need to update state here as socket will trigger an update
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle task update
  const handleUpdateTask = async (taskId, updateData) => {
    try {
      await updateTask(taskId, updateData, user.token);
      // No need to update state here as socket will trigger an update
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, user.token);
      // No need to update state here as socket will trigger an update
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Task Dashboard</h1>

      {error && <div className="error-alert">{error}</div>}

      <div className="dashboard-content">
        <aside className="task-form-sidebar">
          <TaskForm onSubmit={handleCreateTask} loading={formLoading} />
        </aside>

        <section className="tasks-section">
          <h2>My Tasks</h2>

          {loading ? (
            <div className="loading-spinner">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="no-tasks-message">
              No tasks yet. Create your first task!
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;