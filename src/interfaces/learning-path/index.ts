import { ProgressInterface } from 'interfaces/progress';
import { StudentInterface } from 'interfaces/student';
import { CourseInterface } from 'interfaces/course';

export interface LearningPathInterface {
  id?: string;
  name: string;
  course_id: string;
  progress?: ProgressInterface[];
  student?: StudentInterface[];
  course?: CourseInterface;
  _count?: {
    progress?: number;
    student?: number;
  };
}
