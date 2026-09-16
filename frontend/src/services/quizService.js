import API from './api';

export const quizService = {
  getQuizByCourseId: async (courseId) => {
    const response = await API.get(`/quizzes/course/${courseId}`);
    return response.data;
  },
  submitQuizAnswers: async (quizId, answers) => {
    const response = await API.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  },
  createQuiz: async (data) => {
    const response = await API.post('/quizzes', data);
    return response.data;
  }
};

export default quizService;
