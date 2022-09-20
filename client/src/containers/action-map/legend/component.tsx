import { useMemo } from 'react';

import LegendTypeGradient from 'components/map/legend/types/gradient';
import { MAP_RAMP } from 'constants/colors';

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
      <h5 className="uppercase text-grey-20">Map legend</h5>
      <LegendTypeGradient items={ITEMS} />
    </div>
  );
};

export default MapLegend;
