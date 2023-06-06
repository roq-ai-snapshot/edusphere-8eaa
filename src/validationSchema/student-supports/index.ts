import * as yup from 'yup';

export const studentSupportValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  educational_institution_id: yup.string().nullable().required(),
});
