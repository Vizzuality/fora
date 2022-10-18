import { SubGeographic } from './geographics';
import { Investment } from './investment';

export interface Project {
  id: string;
  name: string;
  description: string;
  website: string;
  // Filters
  areas: string[];
  demographics: string[];
  recipient_legal_status: string;
  funder_type: string;
  investments: Investment[];
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
}
