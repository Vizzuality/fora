import { Funder } from './funder';
import { Project } from './project';

export interface Investment {
  id: string;
  funder: Partial<Funder>;
  project: Partial<Project>;
}
