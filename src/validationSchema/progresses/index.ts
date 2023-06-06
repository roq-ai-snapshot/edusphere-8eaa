import * as yup from 'yup';

export const progressValidationSchema = yup.object().shape({
  completion_percentage: yup.number().integer().required(),
  student_id: yup.string().nullable().required(),
  learning_path_id: yup.string().nullable().required(),
});
