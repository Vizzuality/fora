import { Area } from '@/types/api/area';
import { CapitalAcceptances } from '@/types/api/capital-acceptance';
import { CapitalType } from '@/types/api/capital-type';
import { Demographic } from '@/types/api/demographic';
import { FunderLegalStatus } from '@/types/api/funder-legal-status';
import { FunderType } from '@/types/api/funder-type';
import { SubGeographic } from '@/types/api/geographics';
import { Project } from '@/types/api/project';

export interface Funder {
  id: string;
  name: string;
  description: string;
  website: string;
  application_status: string;
  areas: Area['id'][];
  capital_acceptances: CapitalAcceptances[];
  capital_acceptances_other: string | undefined;
  capital_types: CapitalType[];
  contact_email: string;
  date_joined_fora: string;
  demographics: Demographic[];
  funder_legal_status: FunderLegalStatus;
  funder_legal_status_other: string;
  funder_type: FunderType;
  funder_type_other: string | undefined;
  leadership_demographics: Demographic[];
  leadership_demographics_other: string | undefined;
  primary_office_city: string;
  primary_office_state: SubGeographic;
  primary_office_country: SubGeographic;
  primary_office_address: string;
  secondary_email_which_can_be_shared: string | undefined;
  spend_down_strategy: boolean;
  primary_contact_phone: string | undefined;
  primary_contact_role: string | undefined;
  primary_contact_location: string | undefined;
  projects: Partial<Project>[];
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
