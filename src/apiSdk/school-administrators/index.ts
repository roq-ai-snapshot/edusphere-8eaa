import axios from 'axios';
import queryString from 'query-string';
import { SchoolAdministratorInterface } from 'interfaces/school-administrator';
import { GetQueryInterface } from '../../interfaces';

export const getSchoolAdministrators = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/school-administrators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSchoolAdministrator = async (schoolAdministrator: SchoolAdministratorInterface) => {
  const response = await axios.post('/api/school-administrators', schoolAdministrator);
  return response.data;
};

export const updateSchoolAdministratorById = async (id: string, schoolAdministrator: SchoolAdministratorInterface) => {
  const response = await axios.put(`/api/school-administrators/${id}`, schoolAdministrator);
  return response.data;
};

export const getSchoolAdministratorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/school-administrators/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteSchoolAdministratorById = async (id: string) => {
  const response = await axios.delete(`/api/school-administrators/${id}`);
  return response.data;
};
