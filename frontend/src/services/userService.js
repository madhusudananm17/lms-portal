import API from './api';

export const userService = {
  getAllUsers: async () => {
    const response = await API.get('/users');
    return response.data;
  },
  updateUserRole: async (userId, role) => {
    const response = await API.put(`/users/${userId}/role`, { role });
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await API.delete(`/users/${userId}`);
    return response.data;
  }
};

export default userService;
