import {
  DemographicSelected,
  GeographicSelected,
  AreaSelected,
  LegalSelected,
} from 'containers/filters/selected';

export const FILTERS = [
  {
    id: 'geographic',
    name: 'Geographic Scope (Main & Sub-divisions)',
    info: 'The country, region or state a project or funder focuses on working or investing in.',
    className: 'col-span-4',
    Selected: <GeographicSelected />,
  },
  {
    id: 'areas',
    name: 'Area of Focus',
    info: 'A regenerative agriculture related topic a project or funder focuses on working or investing in.',
    className: 'col-span-2',
    Selected: <AreaSelected />,
  },
  {
    id: 'demographics',
    name: 'Demographic Scope',
    info: 'Different demographic groups a project or funder focuses on working or investing in.',
    className: 'col-span-2',
    Selected: <DemographicSelected />,
  },
  {
    id: 'legal',
    name: 'Legal Status',
    info: 'Different demographic groups a project or funder focuses on working or investing in.',
    className: 'col-span-2',
    Selected: <LegalSelected />,
  },
];
