import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';
import { useDemographics } from 'hooks/demographics';
import { useFunder } from 'hooks/funders';

import { SCOPES } from 'constants/scopes';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';
import Loading from 'components/loading';

const FunderPreview = () => {
  const { funderSelected } = useAppSelector((state) => state['/action-map']);

  const { data: areasData } = useAreas();
  const { data: demographicsData } = useDemographics();
  const {
    data: funderData,
    isFetching: funderIsFetching,
    isFetched: funderIsFetched,
  } = useFunder(funderSelected);

  const { id, description, name, website, projects = [] } = funderData;

  const GEOGRAPHIC_SCOPE = useMemo(() => {
    const projSubgeographics = projects.map((proj) => proj.subgeographics);
    const arraySubGeo = projSubgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [projects]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const funderAreas = projects.map((f) => f.areas);
    const arrayAreas = funderAreas?.flat().map((area) => area);

    return areasData.filter((c) => arrayAreas.includes(c.id));
  }, [areasData, projects]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const projDemographics = projects.map((proj) => proj.demographics);
    const arrayDemogr = projDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, projects]);

  const DEMOGRAPHIC_LEADERSHIP_SCOPE = useMemo(() => {
    const funderDemographics = projects.map((f) => f.leadership_demographics);
    const arrayDemogr = funderDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, projects]);

  const CARD_DATA = useMemo(() => {
    return SCOPES.map((attr) => {
      switch (attr.id) {
        case 'geographic-scope':
          return {
            ...attr,
            value: GEOGRAPHIC_SCOPE.join(', '),
          };
        case 'area-of-focus':
          return {
            ...attr,
            value: AREAS_OF_FOCUS.map((a) => a.name).join(' • '),
          };

        case 'demographic-scope':
          return {
            ...attr,
            value: DEMOGRAPHIC_SCOPE.map((d) => d.name).join(', '),
          };
        case 'demographic-leadership':
          return {
            ...attr,
            value: DEMOGRAPHIC_LEADERSHIP_SCOPE.map((d) => d.name).join(', '),
          };
        default:
          return attr;
      }
    });
  }, [GEOGRAPHIC_SCOPE, AREAS_OF_FOCUS, DEMOGRAPHIC_SCOPE, DEMOGRAPHIC_LEADERSHIP_SCOPE]);

  return (
    <>
      <Loading
        visible={funderIsFetching && !funderIsFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
        iconClassName="w-10 h-10"
      />

      <div className="flex space-x-16 lg:space-x-32">
        <div className="w-full space-y-16">
          <div className="space-y-9">
            <div className="space-y-1">
              <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">{name}</h2>
              <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
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

          <Button href={`/funders/${id}`} type="button" size="base" theme="black">
            Go to Funder Page
          </Button>
        </div>

        <div className="w-full">
          <InfoCard type="funder" data={CARD_DATA} count={projects.length} />
        </div>
      </div>
    </>
  );
};

export default FunderPreview;
