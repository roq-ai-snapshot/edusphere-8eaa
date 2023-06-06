import axios from 'axios';
import queryString from 'query-string';
import { TeacherInterface } from 'interfaces/teacher';
import { GetQueryInterface } from '../../interfaces';

export const getTeachers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/teachers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeacher = async (teacher: TeacherInterface) => {
  const response = await axios.post('/api/teachers', teacher);
  return response.data;
};

export const updateTeacherById = async (id: string, teacher: TeacherInterface) => {
  const response = await axios.put(`/api/teachers/${id}`, teacher);
  return response.data;
};

export const getTeacherById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/teachers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeacherById = async (id: string) => {
  const response = await axios.delete(`/api/teachers/${id}`);
  return response.data;
};
