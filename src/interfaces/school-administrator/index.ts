import { UserInterface } from 'interfaces/user';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';

export interface SchoolAdministratorInterface {
  id?: string;
  user_id: string;
  educational_institution_id: string;

  user?: UserInterface;
  educational_institution?: EducationalInstitutionInterface;
  _count?: {};
}
