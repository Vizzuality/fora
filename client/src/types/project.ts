import { Area } from './area';
import { CapitalType } from './capital-type';
import { Demographic } from './demographic';
import { Funder } from './funder';
import { SubGeographic } from './geographics';

export interface Project {
  id: string;
  name: string;
  description: string;
  website: string;
  // Filters
  areas: Area['id'][];
  capital_types: CapitalType['id'][];
  demographics: Demographic['id'][];
  leadership_demographics: Demographic['id'][];
  recipient_legal_status: string;
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
