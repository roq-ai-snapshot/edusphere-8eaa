import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getLearningPathById } from 'apiSdk/learning-paths';
import { Error } from 'components/error';
import { LearningPathInterface } from 'interfaces/learning-path';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { deleteProgressById } from 'apiSdk/progresses';
import { deleteStudentById, createStudent } from 'apiSdk/students';

function LearningPathViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<LearningPathInterface>(
    () => (id ? `/learning-paths/${id}` : null),
    () =>
      getLearningPathById(id, {
        relations: ['course', 'progress', 'student'],
      }),
  );

  const progressHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteProgressById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [studentUserId, setStudentUserId] = useState(null);
  const studentHandleCreate = async () => {
    setCreateError(null);
    try {
      await createStudent({ learning_path_id: id, user_id: studentUserId });
      setStudentUserId(null);
      await mutate();
    } catch (error) {
      setCreateError(error);
    }
  };
  const studentHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteStudentById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Learning Path Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Name:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.name}
            </Text>
            <br />
            {hasAccess('course', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Course:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/courses/view/${data?.course?.id}`}>
                    {data?.course?.name}
                  </Link>
                </Text>
              </>
            )}
            {hasAccess('progress', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Progresses:
                </Text>
                <NextLink passHref href={`/progresses/create?learning_path_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>completion_percentage</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.progress?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.completion_percentage}</Td>
                          <Td>
                            <NextLink passHref href={`/progresses/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/progresses/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => progressHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

            <>
              <Text fontSize="lg" fontWeight="bold">
                Students:
              </Text>
              <UserSelect name={'student_user'} value={studentUserId} handleChange={setStudentUserId} />
              <Button colorScheme="blue" mt="4" mr="4" onClick={studentHandleCreate} isDisabled={!studentUserId}>
                Create
              </Button>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Email</Th>

                      <Th>View</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.student?.map((record) => (
                      <Tr key={record?.user?.id}>
                        <Td>{record?.user?.email}</Td>

                        <Td>
                          <NextLink href={`/users/view/${record?.user?.id}`} passHref>
                            <Button as="a">View</Button>
                          </NextLink>
                        </Td>
                        <Td>
                          <Button onClick={() => studentHandleDelete(record.id)}>Delete</Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'learning_path',
  operation: AccessOperationEnum.READ,
})(LearningPathViewPage);
