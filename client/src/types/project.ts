import { Area } from './area';
import { Demographic } from './demographic';
import { Funder } from './funder';
import { SubGeographic } from './geographics';
import { ProjectLegalStatus } from './project-legal-status';

export interface Project {
  id: string;
  name: string;
  description: string;
  website: string;
  // Filters
  areas: Area['id'][];
  demographics: Demographic['id'][];
  leadership_demographics: Demographic['id'][];
  recipient_legal_status: ProjectLegalStatus;
  funders: Partial<Funder>[];
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographics: SubGeographic[];
  subgeographic_ancestors: SubGeographic[];
}

export type InifiniteProject = {
  data: Project[];
  meta: {
    page: number;
    pages: number;
  };
};
