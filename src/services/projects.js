import api from './api';

export const fetchProjects = () => api.get('/projects');