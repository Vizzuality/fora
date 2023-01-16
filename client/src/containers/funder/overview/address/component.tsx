import React from 'react';

import { useRouter } from 'next/router';

import { useFunder } from 'hooks/funders';

const FunderAddress = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: funderData } = useFunder(`${funderId}`);

  const {
    primary_office_city: officeCity,
    primary_office_country: officeCountry,
    primary_office_state: officeState,
    website,
  } = funderData;

  const ADDRESS = [
    officeCity,
    ...(!!officeState?.name ? [officeState.name] : []),
    officeCountry.name,
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-base font-semibold uppercase text-grey-20">Headquarters Adress</p>
        <p className="capitalize">{ADDRESS.join(', ')}</p>
      </div>

      <p className="font-semibold underline">
        <a href={website} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      </p>
    </div>
  );
};

export default FunderAddress;
