import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['InstitutionOwner'];
  const roles = ['InstitutionOwner', 'SchoolAdministrator', 'Teacher', 'StudentSupport', 'Student', 'Parent'];
  const applicationName = 'EduSphere';
  const tenantName = 'Educational Institution';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Institution Owner:
1. As an Institution Owner, I want to be able to create and customize learning paths for different courses and programs, so that I can offer personalized education to my students.
2. As an Institution Owner, I want to have an overview of the progress of all students in my institution, so that I can identify areas of improvement and make informed decisions.
3. As an Institution Owner, I want to manage administrative tasks such as enrollment, billing, and scheduling, so that I can efficiently run my educational institution.
4. As an Institution Owner, I want to be able to add and manage School Administrators, Teachers, and Student Support staff, so that I can delegate tasks and responsibilities.
5. As an Institution Owner, I want to receive reports and analytics on student performance and engagement, so that I can make data-driven decisions to improve the quality of education.

School Administrator:
1. As a School Administrator, I want to manage student enrollment and registration, so that I can ensure a smooth onboarding process for new students.
2. As a School Administrator, I want to manage teacher and staff schedules, so that I can ensure efficient allocation of resources and avoid conflicts.
3. As a School Administrator, I want to monitor student progress and performance, so that I can identify areas of improvement and provide support where needed.
4. As a School Administrator, I want to manage billing and invoicing for students, so that I can ensure timely payments and maintain financial records.

Teacher:
1. As a Teacher, I want to access and customize the learning paths for my students, so that I can provide personalized education and support.
2. As a Teacher, I want to monitor my students' progress and performance, so that I can provide timely feedback and guidance.
3. As a Teacher, I want to communicate with students and parents, so that I can address concerns and provide updates on student performance.
4. As a Teacher, I want to access resources and tools to support my teaching, so that I can effectively deliver the curriculum.

Student Support:
1. As a Student Support staff member, I want to monitor student progress and performance, so that I can identify students who may need additional support.
2. As a Student Support staff member, I want to communicate with students, parents, and teachers, so that I can provide guidance and assistance.
3. As a Student Support staff member, I want to access resources and tools to support students, so that I can effectively address their needs and concerns.

Student:
1. As a Student, I want to access my personalized learning path, so that I can follow the curriculum and achieve my learning goals.
2. As a Student, I want to track my progress and performance, so that I can identify areas of improvement and seek support when needed.
3. As a Student, I want to communicate with my teachers and Student Support staff, so that I can ask questions and receive guidance.

Parent:
1. As a Parent, I want to monitor my child's progress and performance, so that I can support their learning and address any concerns.
2. As a Parent, I want to communicate with teachers and Student Support staff, so that I can stay informed about my child's education and provide assistance when needed.
3. As a Parent, I want to access resources and tools to support my child's learning, so that I can effectively help them achieve their goals.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
