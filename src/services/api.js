import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const getTasks = async (token) => {
  try {
    const response = await axios.get('https://taskmanagerwithauthbackend.onrender.com/tasks', {
      headers: {
        Authorization: `Bearer ${token}` // Ensure the token is being passed correctly
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createTask = (taskData, token) => {
  return axios.post(https://taskmanagerwithauthbackend.onrender.com/tasks', taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = (id, data, token) => API.put(`/tasks/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const deleteTask = (id, token) => API.delete(`/tasks/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});
