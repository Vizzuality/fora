import { Area } from './area';
import { CapitalType } from './capital-type';
import { Demographic } from './demographic';
import { FunderLegalStatus } from './funder-legal-status';
import { FunderType } from './funder-type';
import { SubGeographic } from './geographics';
import { Investment } from './investment';
import { Project } from './project';

/**
 * This is an example of a type/interface that's used in more than just
 * one place throughout the app.
 */
export interface Funder {
  id: string;
  name: string;
  description: string;
  website: string;
  // Filters
  areas: Area['id'][];
  capital_acceptances: string[];
  capital_types: CapitalType['id'][];
  contact_email: string;
  date_joined_fora: string;
  demographics: Demographic['id'][];
  funder_legal_status: FunderLegalStatus['id'];
  funder_type: FunderType['id'];
  investments: Investment[];
  projects: Partial<Project>[];
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
}
