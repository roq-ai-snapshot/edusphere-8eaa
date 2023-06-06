import * as yup from 'yup';
import { learningPathValidationSchema } from 'validationSchema/learning-paths';

export const courseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  educational_institution_id: yup.string().nullable().required(),
  learning_path: yup.array().of(learningPathValidationSchema),
});
