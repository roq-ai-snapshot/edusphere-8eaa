import { LearningPathInterface } from 'interfaces/learning-path';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';

export interface CourseInterface {
  id?: string;
  name: string;
  educational_institution_id: string;
  learning_path?: LearningPathInterface[];
  educational_institution?: EducationalInstitutionInterface;
  _count?: {
    learning_path?: number;
  };
}
