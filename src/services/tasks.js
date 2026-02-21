import api from './api';

export const fetchTasks = () => api.get('/tasks');