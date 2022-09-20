import {
  DemographicScopeModal,
  GeographicScopeModal,
  AreaScopeModal,
} from 'containers/action-map/filters/modals';
import {
  DemographicSelected,
  GeographicSelected,
  AreaSelected,
} from 'containers/action-map/filters/selected';

export const FILTERS = [
  {
    id: 'geographic',
    name: 'Geographic Scope',
    info: 'The country, region or state a project or funder focuses on working or investing in.',
    Selected: <GeographicSelected />,
    Modal: <GeographicScopeModal />,
  },
  {
    id: 'areas',
    name: 'Area of Focus',
    info: 'A regenerative agriculture related topic a project or funder focuses on working or investing in.',
    Selected: <AreaSelected />,
    Modal: <AreaScopeModal />,
  },
  {
    id: 'demographics',
    name: 'Demographic Scope',
    info: 'Different demographic groups a project or funder focuses on working or investing in.',
    Selected: <DemographicSelected />,
    Modal: <DemographicScopeModal />,
  },
];
