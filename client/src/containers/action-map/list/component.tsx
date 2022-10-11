import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { max, omit } from 'lodash';

import { useFundersByGeographicScope } from 'hooks/funders';
import { useProjectsByGeographicScope } from 'hooks/projects';

import Item from './item';
import type { ListProps } from './types';

const List: React.FC<ListProps> = () => {
  const { view, type, filters } = useAppSelector((state) => state['/action-map']);
  const { subgeographics } = filters;

  const { data: fundersData } = useFundersByGeographicScope(view, {
    filters: omit(filters, ['geographic', 'subgeographics']),
  });

  const { data: projectsData } = useProjectsByGeographicScope(view, {
    filters: omit(filters, ['geographic', 'subgeographics']),
  });

  const DATA = useMemo(() => {
    const d = {
      funders: fundersData,
      projects: projectsData,
    };

    return d[type];
  }, [type, fundersData, projectsData]);

  const MAX = max(DATA.map((d) => d.count)) || 0;

  return (
    <div className="relative flex flex-col h-full py-px overflow-hidden grow">
      <div className="absolute left-0 z-10 w-full h-5 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />
      <div className="relative flex flex-col overflow-hidden grow">
        <div className="flex flex-col py-5 pr-5 space-y-5 overflow-x-hidden overflow-y-auto grow">
          <div className="space-y-5">
            <div className="flex justify-between">
              <h4 className="font-semibold uppercase text-grey-20">Location</h4>
              <h4 className="font-semibold uppercase text-grey-20">{type}</h4>
            </div>
            <ul className="space-y-2">
              {DATA.filter((d) => !subgeographics.length || subgeographics.includes(d.id)).map(
                (d) => (
                  <Item {...d} key={d.id} max={MAX} />
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-full h-5 pointer-events-none bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default List;
