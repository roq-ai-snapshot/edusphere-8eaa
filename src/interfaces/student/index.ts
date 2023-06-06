import { ParentInterface } from 'interfaces/parent';
import { ProgressInterface } from 'interfaces/progress';
import { UserInterface } from 'interfaces/user';
import { LearningPathInterface } from 'interfaces/learning-path';

export interface StudentInterface {
  id?: string;
  user_id: string;
  learning_path_id: string;
  parent?: ParentInterface[];
  progress?: ProgressInterface[];
  user?: UserInterface;
  learning_path?: LearningPathInterface;
  _count?: {
    parent?: number;
    progress?: number;
  };
}
