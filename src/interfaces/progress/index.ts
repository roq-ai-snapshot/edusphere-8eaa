import { StudentInterface } from 'interfaces/student';
import { LearningPathInterface } from 'interfaces/learning-path';

export interface ProgressInterface {
  id?: string;
  student_id: string;
  learning_path_id: string;
  completion_percentage: number;

  student?: StudentInterface;
  learning_path?: LearningPathInterface;
  _count?: {};
}
