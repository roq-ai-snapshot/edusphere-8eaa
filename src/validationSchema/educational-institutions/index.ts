import * as yup from 'yup';
import { courseValidationSchema } from 'validationSchema/courses';
import { schoolAdministratorValidationSchema } from 'validationSchema/school-administrators';
import { studentSupportValidationSchema } from 'validationSchema/student-supports';
import { teacherValidationSchema } from 'validationSchema/teachers';

export const educationalInstitutionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  course: yup.array().of(courseValidationSchema),
  school_administrator: yup.array().of(schoolAdministratorValidationSchema),
  student_support: yup.array().of(studentSupportValidationSchema),
  teacher: yup.array().of(teacherValidationSchema),
});
