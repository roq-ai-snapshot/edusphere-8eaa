import { UserInterface } from 'interfaces/user';
import { StudentInterface } from 'interfaces/student';

export interface ParentInterface {
  id?: string;
  user_id: string;
  student_id: string;

  user?: UserInterface;
  student?: StudentInterface;
  _count?: {};
}
