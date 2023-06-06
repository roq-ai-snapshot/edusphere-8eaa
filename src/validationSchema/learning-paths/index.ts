import * as yup from 'yup';
import { progressValidationSchema } from 'validationSchema/progresses';
import { studentValidationSchema } from 'validationSchema/students';

export const learningPathValidationSchema = yup.object().shape({
  name: yup.string().required(),
  course_id: yup.string().nullable().required(),
  progress: yup.array().of(progressValidationSchema),
  student: yup.array().of(studentValidationSchema),
});
