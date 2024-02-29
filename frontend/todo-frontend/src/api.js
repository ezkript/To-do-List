import axios from 'axios';
import { getAuthHeaders } from './utils/headers';

export const API_URL = 'https://to-do-list-dev-hkbk.3.us-1.fl0.io/api';

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
  };
};

export const register = async (data) => {
  try {
    const response = await API.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  };
};

/* --------------------- USER ------------------------ */

export const showMe = async () => {
  try {
    const response = await API.get('/user/me', {headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  };
};

/* --------------------- LIST ------------------------ */

export const createList = async (data) => {
    try {
      const response = await API.post('/list', data, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

export const removeList = async (id) => {
    try {
      const response = await API.delete(`/list/${id}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

export const getLists = async () => {
    try {
      const response = await API.get(`/list/all`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

export const getListById = async (id) => {
    try {
      const response = await API.get(`/list/${id}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

/*---------------------- TASK --------------------*/

export const createTask = async (listId, data) => {
    try {
      const response = await API.post(`/task/${listId}`, data, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

export const removeTask = async (id, listId) => {
    try {
      const response = await API.delete(`/task/${id}/${listId}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

export const toggleTask = async (id) => {
    try {
      const response = await API.patch(`/task/toggle/${id}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};

export const getTasks = async (id) => {
    try {
      const response = await API.get(`/task/all/${id}`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw error;
    };
};