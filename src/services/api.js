// src/services/api.js

import axios from 'axios';

// Base axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Must end with `/api`, e.g., https://taskmanagerwithauthbackend.onrender.com/api
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Auth APIs =====

export const register = async (data) => {
  try {
    const response = await API.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await API.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// ===== Task APIs =====

export const getTasks = async (token) => {
  try {
    const response = await API.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData, token) => {
  try {
    const response = await API.post('/tasks', taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, data, token) => {
  try {
    const response = await API.put(`/tasks/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id, token) => {
  try {
    const response = await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
