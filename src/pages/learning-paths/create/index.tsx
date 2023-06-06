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
import { createLearningPath } from 'apiSdk/learning-paths';
import { Error } from 'components/error';
import { learningPathValidationSchema } from 'validationSchema/learning-paths';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CourseInterface } from 'interfaces/course';
import { getStudents } from 'apiSdk/students';
import { StudentInterface } from 'interfaces/student';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { getCourses } from 'apiSdk/courses';
import { LearningPathInterface } from 'interfaces/learning-path';

function LearningPathCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LearningPathInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLearningPath(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LearningPathInterface>({
    initialValues: {
      name: '',
      course_id: (router.query.course_id as string) ?? null,
      progress: [],
      student: [],
    },
    validationSchema: learningPathValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Learning Path
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CourseInterface>
            formik={formik}
            name={'course_id'}
            label={'Select Course'}
            placeholder={'Select Course'}
            fetcher={getCourses}
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
  entity: 'learning_path',
  operation: AccessOperationEnum.CREATE,
})(LearningPathCreatePage);
