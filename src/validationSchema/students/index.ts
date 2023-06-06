import * as yup from 'yup';
import { parentValidationSchema } from 'validationSchema/parents';
import { progressValidationSchema } from 'validationSchema/progresses';

export const studentValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  learning_path_id: yup.string().nullable().required(),
  parent: yup.array().of(parentValidationSchema),
  progress: yup.array().of(progressValidationSchema),
});
