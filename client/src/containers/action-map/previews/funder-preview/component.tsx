import React, { useCallback, useMemo } from 'react';

import { setFunderSelected } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useDemographics } from 'hooks/demographics';
import { useFunder, useFunders } from 'hooks/funders';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';

import CHEVRON_LEFT from 'svgs/ui/chevron-left.svg?sprite';
import CHEVRON_RIGHT from 'svgs/ui/chevron-right.svg?sprite';

import { PROJECT_CARD_INFO } from './constants';
import type { FunderPreviewProps } from './types';

const FunderPreview: React.FC<FunderPreviewProps> = ({ onClick }) => {
  const { funderSelected, filters } = useAppSelector((state) => state['/action-map']);
  const { data: demographicsData } = useDemographics();
  const {
    data: funderData,
    isFetching: funderIsFetching,
    isFetched: funderIsFetched,
  } = useFunder(funderSelected);

  const { data: fundersData } = useFunders({
    filters,
    includes: 'subgeographic_ancestors',
  });

  const dispatch = useAppDispatch();

  const { description, name, website, projects = [] } = funderData;

  const DATA = useMemo(() => {
    return fundersData
      .map((d) => {
        const { projects: p } = d;

        return {
          ...d,
          count: p.length,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [fundersData]);

  const GEOGRPAHIC_SCOPE = useMemo(() => {
    const projSubgeographics = projects.map((proj) => proj.subgeographics);
    const arraySubGeo = projSubgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [projects]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const projDemographics = projects.map((proj) => proj.demographics);
    const arrayDemogr = projDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, projects]);

  const CARD_DATA = useMemo(() => {
    return PROJECT_CARD_INFO.map((attr) => {
      switch (attr.id) {
        case 'geogpraphic-scope':
          return {
            ...attr,
            value: GEOGRPAHIC_SCOPE.join(', '),
          };
        case 'demographic-scope':
          return {
            ...attr,
            value: DEMOGRAPHIC_SCOPE.map((d) => d.name).join(', '),
          };
        case 'demographic-leadership':
          return {
            ...attr,
            value: DEMOGRAPHIC_SCOPE.map((d) => d.name).join(', '),
          };
        default:
          return attr;
      }
    });
  }, [GEOGRPAHIC_SCOPE, DEMOGRAPHIC_SCOPE]);

  const handleOnPreviousClick = useCallback(() => {
    const IDS = DATA.map((d) => d.id);
    const currentIndex = IDS.indexOf(funderSelected);
    const previousIndex = currentIndex - 1 < 0 ? IDS.length - 1 : currentIndex - 1;
    dispatch(setFunderSelected(IDS[previousIndex]));
  }, [dispatch, funderSelected, DATA]);

  const handleOnNextClick = useCallback(() => {
    const IDS = DATA.map((d) => d.id);
    const currentIndex = IDS.indexOf(funderSelected);
    const nextIndex = currentIndex + 1 > IDS.length - 1 ? 0 : currentIndex + 1;
    dispatch(setFunderSelected(IDS[nextIndex]));
  }, [dispatch, funderSelected, DATA]);

  return (
    <>
      <Loading
        visible={funderIsFetching && !funderIsFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
        iconClassName="w-10 h-10"
      />

      <div className="relative flex flex-col grow">
        <div className="absolute top-0 left-0 flex items-center justify-end w-full h-full pointer-events-none">
          <div className="space-y-6 translate-x-1/2 mariasola">
            <button
              type="button"
              aria-label="arrow-left"
              className="flex items-center justify-center bg-black border-black rounded-full w-9 h-9"
              onClick={handleOnPreviousClick}
            >
              <Icon className="w-5 h-5 fill-white" icon={CHEVRON_LEFT} />
            </button>
            <button
              type="button"
              aria-label="arrow-right"
              className="flex items-center justify-center bg-black border-black rounded-full w-9 h-9"
              onClick={handleOnNextClick}
            >
              <Icon className="w-5 h-5 fill-white" icon={CHEVRON_RIGHT} />
            </button>
          </div>
        </div>
        <div className="overflow-auto px-9 grow">
          <div className="pt-16 pb-8">
            <div className="flex space-x-16 lg:space-x-32">
              <div className="w-full space-y-16">
                <div className="space-y-9">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">
                      {name}
                    </h2>
                    <div className="text-base font-normal text-grey-20">
                      Last updated: 30 March 2022
                    </div>
                  </div>
                  <p className="font-semibold underline">
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {website}
                    </a>
                  </p>

                  <div className="space-y-3">
                    <p className="font-semibold uppercase text-grey-20">About</p>
                    <p className="text-xl">{description}</p>
                  </div>
                </div>

                <Button type="button" size="base" theme="black" onClick={onClick}>
                  Go to Funder Page
                </Button>
              </div>

              <div className="w-full">
                <InfoCard data={CARD_DATA} count={projects.length} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunderPreview;
