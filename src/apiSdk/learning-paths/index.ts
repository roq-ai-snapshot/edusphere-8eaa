import axios from 'axios';
import queryString from 'query-string';
import { LearningPathInterface } from 'interfaces/learning-path';
import { GetQueryInterface } from '../../interfaces';

export const getLearningPaths = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/learning-paths${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLearningPath = async (learningPath: LearningPathInterface) => {
  const response = await axios.post('/api/learning-paths', learningPath);
  return response.data;
};

export const updateLearningPathById = async (id: string, learningPath: LearningPathInterface) => {
  const response = await axios.put(`/api/learning-paths/${id}`, learningPath);
  return response.data;
};

export const getLearningPathById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/learning-paths/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLearningPathById = async (id: string) => {
  const response = await axios.delete(`/api/learning-paths/${id}`);
  return response.data;
};
