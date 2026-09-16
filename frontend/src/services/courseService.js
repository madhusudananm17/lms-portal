import API from './api';

export const courseService = {
  getAllCourses: async (params = {}) => {
    const response = await API.get('/courses', { params });
    return response.data;
  },
  getCourseById: async (id) => {
    const response = await API.get(`/courses/${id}`);
    return response.data;
  },
  createCourse: async (data) => {
    const response = await API.post('/courses', data);
    return response.data;
  },
  updateCourse: async (id, data) => {
    const response = await API.put(`/courses/${id}`, data);
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await API.delete(`/courses/${id}`);
    return response.data;
  }
};

export default courseService;
