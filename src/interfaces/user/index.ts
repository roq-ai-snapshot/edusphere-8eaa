import { ParentInterface } from 'interfaces/parent';
import { SchoolAdministratorInterface } from 'interfaces/school_administrator';
import { StudentInterface } from 'interfaces/student';
import { StudentSupportInterface } from 'interfaces/student_support';
import { TeacherInterface } from 'interfaces/teacher';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  parent: ParentInterface[];
  school_administrator: SchoolAdministratorInterface[];
  student: StudentInterface[];
  student_support: StudentSupportInterface[];
  teacher: TeacherInterface[];
}
