import { SubGeographic } from './geographics';
import { Investment } from './investment';

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
  areas: string[];
  capital_acceptances: string[];
  capital_types: string[];
  contact_email: string;
  date_joined_fora: string;
  demographics: string[];
  funder_legal_status: string;
  funder_type: string;
  investments: Investment[];
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
}
