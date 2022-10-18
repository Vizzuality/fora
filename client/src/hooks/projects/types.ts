import { SubGeographic } from 'hooks/geographics/types';

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
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
}

export interface ProjectsResponseData {
  data: Project[];
}

export interface ProjectResponseData {
  data: Project;
}

export interface UseProjectsOptionsProps {
  search?: string;
  sort?: string;
  filters?: Record<string, any>;
}
