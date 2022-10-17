import React, { useMemo } from 'react';

import { Field as FieldRFF } from 'react-final-form';

// import { useDebounceCallback } from '@react-hook/debounce';

import { useGeographics } from 'hooks/geographics';

import ButtonsGroup from 'components/buttons-group';
// import Search from 'components/search';

const GeographicScopeHeader: React.FC = () => {
  // const [search, setSearch] = useState('');
  const { data: geographicsData } = useGeographics();

  const OPTIONS = useMemo(() => {
    return geographicsData.map((g) => {
      return {
        label: g.name,
        value: g.id,
      };
    });
  }, [geographicsData]);

  // const handleSearch = useDebounceCallback((value: string) => {
  //   setSearch(value);
  // }, 250);

  return (
    <header className="px-10">
      <div className="space-y-7">
        <h2 className="text-2xl font-normal font-display whitespace-nowrap text-grey-0">
          Filter the data by <span className="font-semibold">Geographic Scope</span>
        </h2>

        <FieldRFF name="geographic">
          {({ input }) => (
            <ButtonsGroup
              selected={input.value}
              items={OPTIONS}
              theme="green"
              onChange={(e) => {
                input.onChange(e);
              }}
            />
          )}
        </FieldRFF>

        {/* <Search value={search} placeholder="Search" theme="light" onChange={handleSearch} /> */}
      </div>
    </header>
  );
};

export default GeographicScopeHeader;
