import { DemographicSelected, GeographicSelected, AreaSelected } from 'containers/filters/selected';

export const FILTERS = (type) => {
  return [
    {
      id: 'geographic',
      name: (
        <>
          Geographic Scope <span className="normal-case">(Main & Sub-divisions)</span>
        </>
      ),
      info: 'The country, region or state a project or funder focuses on working or investing in.',
      className: 'col-span-4',
      Selected: <GeographicSelected type={type} />,
    },
    {
      id: 'areas',
      name: 'Area of Focus',
      info: 'A regenerative agriculture related topic a project or funder focuses on working or investing in.',
      className: 'col-span-2',
      Selected: <AreaSelected type={type} />,
    },
    {
      id: 'demographics',
      name: 'Demographic Scope',
      info: 'Different demographic groups a project or funder focuses on working or investing in.',
      className: 'col-span-2',
      Selected: <DemographicSelected type={type} />,
    },
  ];
};
