import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createCourse } from 'apiSdk/courses';
import { Error } from 'components/error';
import { courseValidationSchema } from 'validationSchema/courses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';
import { getEducationalInstitutions } from 'apiSdk/educational-institutions';
import { CourseInterface } from 'interfaces/course';

function CourseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CourseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCourse(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CourseInterface>({
    initialValues: {
      name: '',
      educational_institution_id: (router.query.educational_institution_id as string) ?? null,
      learning_path: [],
    },
    validationSchema: courseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Course
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<EducationalInstitutionInterface>
            formik={formik}
            name={'educational_institution_id'}
            label={'Select Educational Institution'}
            placeholder={'Select Educational Institution'}
            fetcher={getEducationalInstitutions}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'course',
  operation: AccessOperationEnum.CREATE,
})(CourseCreatePage);
