import {
  DemographicSelected,
  GeographicSelected,
  AreaSelected,
  LegalSelected,
  OrganizationSelected,
} from 'containers/funders/filters/selected';

export const FILTERS = [
  {
    id: 'geographic',
    name: 'Geographic Scope',
    info: 'The country, region or state a project or funder focuses on working or investing in.',
    Selected: <GeographicSelected />,
  },
  {
    id: 'areas',
    name: 'Area of Focus',
    info: 'A regenerative agriculture related topic a project or funder focuses on working or investing in.',
    Selected: <AreaSelected />,
  },
  {
    id: 'demographics',
    name: 'Demographic Scope',
    info: 'Different demographic groups a project or funder focuses on working or investing in.',
    Selected: <DemographicSelected />,
  },
  {
    id: 'organization',
    name: 'Organization Type',
    info: 'Different demographic groups a project or funder focuses on working or investing in.',
    Selected: <OrganizationSelected />,
  },
  {
    id: 'legal',
    name: 'Legal Status',
    info: 'Different demographic groups a project or funder focuses on working or investing in.',
    Selected: <LegalSelected />,
  },
];
