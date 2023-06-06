import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getEducationalInstitutionById } from 'apiSdk/educational-institutions';
import { Error } from 'components/error';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { deleteCourseById } from 'apiSdk/courses';
import { deleteSchoolAdministratorById, createSchoolAdministrator } from 'apiSdk/school-administrators';
import { deleteStudentSupportById, createStudentSupport } from 'apiSdk/student-supports';
import { deleteTeacherById, createTeacher } from 'apiSdk/teachers';

function EducationalInstitutionViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EducationalInstitutionInterface>(
    () => (id ? `/educational-institutions/${id}` : null),
    () =>
      getEducationalInstitutionById(id, {
        relations: ['user', 'course', 'school_administrator', 'student_support', 'teacher'],
      }),
  );

  const courseHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteCourseById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [school_administratorUserId, setSchool_administratorUserId] = useState(null);
  const school_administratorHandleCreate = async () => {
    setCreateError(null);
    try {
      await createSchoolAdministrator({ educational_institution_id: id, user_id: school_administratorUserId });
      setSchool_administratorUserId(null);
      await mutate();
    } catch (error) {
      setCreateError(error);
    }
  };
  const school_administratorHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteSchoolAdministratorById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [student_supportUserId, setStudent_supportUserId] = useState(null);
  const student_supportHandleCreate = async () => {
    setCreateError(null);
    try {
      await createStudentSupport({ educational_institution_id: id, user_id: student_supportUserId });
      setStudent_supportUserId(null);
      await mutate();
    } catch (error) {
      setCreateError(error);
    }
  };
  const student_supportHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteStudentSupportById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [teacherUserId, setTeacherUserId] = useState(null);
  const teacherHandleCreate = async () => {
    setCreateError(null);
    try {
      await createTeacher({ educational_institution_id: id, user_id: teacherUserId });
      setTeacherUserId(null);
      await mutate();
    } catch (error) {
      setCreateError(error);
    }
  };
  const teacherHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteTeacherById(id);
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
        Educational Institution Detail View
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
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  User:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/users/view/${data?.user?.id}`}>
                    {data?.user?.email}
                  </Link>
                </Text>
              </>
            )}
            {hasAccess('course', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Courses:
                </Text>
                <NextLink passHref href={`/courses/create?educational_institution_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>name</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.course?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.name}</Td>
                          <Td>
                            <NextLink passHref href={`/courses/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/courses/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => courseHandleDelete(record.id)}>Delete</Button>
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
                School Administrators:
              </Text>
              <UserSelect
                name={'school_administrator_user'}
                value={school_administratorUserId}
                handleChange={setSchool_administratorUserId}
              />
              <Button
                colorScheme="blue"
                mt="4"
                mr="4"
                onClick={school_administratorHandleCreate}
                isDisabled={!school_administratorUserId}
              >
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
                    {data?.school_administrator?.map((record) => (
                      <Tr key={record?.user?.id}>
                        <Td>{record?.user?.email}</Td>

                        <Td>
                          <NextLink href={`/users/view/${record?.user?.id}`} passHref>
                            <Button as="a">View</Button>
                          </NextLink>
                        </Td>
                        <Td>
                          <Button onClick={() => school_administratorHandleDelete(record.id)}>Delete</Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>

            <>
              <Text fontSize="lg" fontWeight="bold">
                Student Supports:
              </Text>
              <UserSelect
                name={'student_support_user'}
                value={student_supportUserId}
                handleChange={setStudent_supportUserId}
              />
              <Button
                colorScheme="blue"
                mt="4"
                mr="4"
                onClick={student_supportHandleCreate}
                isDisabled={!student_supportUserId}
              >
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
                    {data?.student_support?.map((record) => (
                      <Tr key={record?.user?.id}>
                        <Td>{record?.user?.email}</Td>

                        <Td>
                          <NextLink href={`/users/view/${record?.user?.id}`} passHref>
                            <Button as="a">View</Button>
                          </NextLink>
                        </Td>
                        <Td>
                          <Button onClick={() => student_supportHandleDelete(record.id)}>Delete</Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>

            <>
              <Text fontSize="lg" fontWeight="bold">
                Teachers:
              </Text>
              <UserSelect name={'teacher_user'} value={teacherUserId} handleChange={setTeacherUserId} />
              <Button colorScheme="blue" mt="4" mr="4" onClick={teacherHandleCreate} isDisabled={!teacherUserId}>
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
                    {data?.teacher?.map((record) => (
                      <Tr key={record?.user?.id}>
                        <Td>{record?.user?.email}</Td>

                        <Td>
                          <NextLink href={`/users/view/${record?.user?.id}`} passHref>
                            <Button as="a">View</Button>
                          </NextLink>
                        </Td>
                        <Td>
                          <Button onClick={() => teacherHandleDelete(record.id)}>Delete</Button>
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
  entity: 'educational_institution',
  operation: AccessOperationEnum.READ,
})(EducationalInstitutionViewPage);
