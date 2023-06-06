import axios from 'axios';
import queryString from 'query-string';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';
import { GetQueryInterface } from '../../interfaces';

export const getEducationalInstitutions = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/educational-institutions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEducationalInstitution = async (educationalInstitution: EducationalInstitutionInterface) => {
  const response = await axios.post('/api/educational-institutions', educationalInstitution);
  return response.data;
};

export const updateEducationalInstitutionById = async (
  id: string,
  educationalInstitution: EducationalInstitutionInterface,
) => {
  const response = await axios.put(`/api/educational-institutions/${id}`, educationalInstitution);
  return response.data;
};

export const getEducationalInstitutionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/educational-institutions/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteEducationalInstitutionById = async (id: string) => {
  const response = await axios.delete(`/api/educational-institutions/${id}`);
  return response.data;
};
