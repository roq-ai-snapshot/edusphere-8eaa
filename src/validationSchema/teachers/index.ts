import * as yup from 'yup';

export const teacherValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  educational_institution_id: yup.string().nullable().required(),
});
