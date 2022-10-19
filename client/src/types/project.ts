import { Demographic } from './demographic';
import { Funder } from './funder';
import { SubGeographic } from './geographics';
import { Investment } from './investment';
import { ProjectLegalStatus } from './project-legal-status';

export interface Project {
  id: string;
  name: string;
  description: string;
  website: string;
  // Filters
  // areas: string[];
  demographics: Demographic['id'][];
  recipient_legal_status: ProjectLegalStatus;
  investments: Investment[];
  funders: Partial<Funder>[];
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
}
