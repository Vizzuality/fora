import { OrganizationType } from '@/containers/auth/details/form/types';
import { Area } from '@/types/area';
import { CapitalType } from '@/types/capital-type';
import { Demographic } from '@/types/demographic';
import { FunderLegalStatus } from '@/types/funder-legal-status';
import { FunderType } from '@/types/funder-type';
import { SubGeographic } from '@/types/geographics';
import { Project } from '@/types/project';

export interface Funder {
  id: string;
  name: string;
  description: string;
  website: string;
  application_status: string;
  areas: Area['id'][];
  capital_acceptances: string[];
  capital_types: CapitalType['id'][];
  contact_email: string;
  date_joined_fora: string;
  demographics: Demographic['id'][];
  funder_legal_status: FunderLegalStatus['id'];
  funder_legal_status_other: string;
  funder_type: FunderType['id'];
  leadership_demographics: Demographic['id'][];
  primary_office_city: string;
  primary_office_state: SubGeographic;
  primary_office_country: SubGeographic;
  primary_office_address: string;
  projects: Partial<Project>[];
  organization_type: OrganizationType;
  organization_type_other: string;
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
  subgeographics: SubGeographic[];
  created_at: string;
  updated_at: string;
}
