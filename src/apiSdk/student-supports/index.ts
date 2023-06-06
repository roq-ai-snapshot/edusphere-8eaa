import axios from 'axios';
import queryString from 'query-string';
import { StudentSupportInterface } from 'interfaces/student-support';
import { GetQueryInterface } from '../../interfaces';

export const getStudentSupports = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/student-supports${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudentSupport = async (studentSupport: StudentSupportInterface) => {
  const response = await axios.post('/api/student-supports', studentSupport);
  return response.data;
};

export const updateStudentSupportById = async (id: string, studentSupport: StudentSupportInterface) => {
  const response = await axios.put(`/api/student-supports/${id}`, studentSupport);
  return response.data;
};

export const getStudentSupportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/student-supports/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudentSupportById = async (id: string) => {
  const response = await axios.delete(`/api/student-supports/${id}`);
  return response.data;
};
