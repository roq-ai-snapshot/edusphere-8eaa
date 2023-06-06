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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getProgressById, updateProgressById } from 'apiSdk/progresses';
import { Error } from 'components/error';
import { progressValidationSchema } from 'validationSchema/progresses';
import { ProgressInterface } from 'interfaces/progress';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StudentInterface } from 'interfaces/student';
import { LearningPathInterface } from 'interfaces/learning-path';
import { getStudents } from 'apiSdk/students';
import { getLearningPaths } from 'apiSdk/learning-paths';

function ProgressEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProgressInterface>(
    () => (id ? `/progresses/${id}` : null),
    () => getProgressById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProgressInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProgressById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProgressInterface>({
    initialValues: data,
    validationSchema: progressValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Progress
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="completion_percentage" mb="4" isInvalid={!!formik.errors?.completion_percentage}>
              <FormLabel>Completion Percentage</FormLabel>
              <NumberInput
                name="completion_percentage"
                value={formik.values?.completion_percentage}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('completion_percentage', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.completion_percentage && (
                <FormErrorMessage>{formik.errors?.completion_percentage}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<StudentInterface>
              formik={formik}
              name={'student_id'}
              label={'Select Student'}
              placeholder={'Select Student'}
              fetcher={getStudents}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.user_id}
                </option>
              )}
            />
            <AsyncSelect<LearningPathInterface>
              formik={formik}
              name={'learning_path_id'}
              label={'Select Learning Path'}
              placeholder={'Select Learning Path'}
              fetcher={getLearningPaths}
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'progress',
  operation: AccessOperationEnum.UPDATE,
})(ProgressEditPage);
