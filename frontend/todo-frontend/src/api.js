import axios from 'axios';
import { getAuthHeaders } from './utils/headers';

export const API_URL = 'http://127.0.0.1:4001/api';

const API = axios.create({
	baseURL: `${API_URL}`,
	headers: getAuthHeaders(),
});

/* --------------------- AUTHENTICATION ------------------------ */

export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await API.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* --------------------- LIST ------------------------ */

export const createList = async (data) => {
    try {
      const response = await API.post('/list', data, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const removeList = async (id) => {
    try {
      const response = await API.delete(`/list/${id}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    }
};

/*---------------------- TASK --------------------*/

export const createTask = async (listId, data) => {
    try {
      const response = await API.post(`/task/${listId}`, data, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const removeTask = async (id, listId) => {
    try {
      const response = await API.delete(`/task/${id}/${listId}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const toggleTask = async (id) => {
    try {
      const response = await API.delete(`/task/toggle/${id}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    }
};