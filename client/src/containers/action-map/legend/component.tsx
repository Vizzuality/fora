import { useMemo } from 'react';

import { MAP_RAMP } from 'constants/colors';

import LegendTypeGradient from 'components/legend/types/gradient';

const MapLegend = () => {
  const ITEMS = useMemo(() => {
    const ramp = [...MAP_RAMP];

    ramp.reverse();

    return ramp.map((c, i) => {
      return {
        color: c,
        ...(i === 0 && {
          value: 'Low',
        }),
        ...(i === MAP_RAMP.length - 1 && {
          value: 'High',
        }),
      };
    });
  }, []);

  return (
    <div className="w-full pt-3 space-y-2 border-t border-grey-40/50">
      <h5 className="font-semibold uppercase text-grey-20">Map legend</h5>
      <LegendTypeGradient items={ITEMS} />
    </div>
  );
};

export default MapLegend;
