import { CourseInterface } from 'interfaces/course';
import { SchoolAdministratorInterface } from 'interfaces/school-administrator';
import { StudentSupportInterface } from 'interfaces/student-support';
import { TeacherInterface } from 'interfaces/teacher';
import { UserInterface } from 'interfaces/user';

export interface EducationalInstitutionInterface {
  id?: string;
  name: string;
  user_id: string;
  course?: CourseInterface[];
  school_administrator?: SchoolAdministratorInterface[];
  student_support?: StudentSupportInterface[];
  teacher?: TeacherInterface[];
  user?: UserInterface;
  _count?: {
    course?: number;
    school_administrator?: number;
    student_support?: number;
    teacher?: number;
  };
}
