import { useMemo, useState } from 'react';

import { Widget } from 'types/widget';

import HorizontalBar from 'components/charts/horizontal-bar';

import HorizonalBarTooltip from './tooltip/component';

const WidgetDiagramHorizontalBar = ({ query, config }: Widget) => {
  const [tooltip, setTooltip] = useState({
    rect: null,
    properties: null,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) return [];

    const { data: d } = data;

    return d.values
      .map((v) => {
        const [name, value] = v;

        return {
          id: name.id,
          label: name.value,
          ...value,
        };
      })
      .filter((v) => v.value)
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <div className="flex pt-10 space-x-2">
      {/* CHART */}
      <div className="shrink-0 grow">
        <HorizontalBar
          data={DATA}
          onPathMouseEnter={(e, d) => {
            setTooltip({
              rect: {
                top: e.clientY,
                left: e.clientX,
                right: e.clientX,
                bottom: e.clientY,
                x: e.clientX,
                y: e.clientY,
                width: 0,
                height: 0,
                toJSON: () => ({}),
              },
              properties: d,
            });
          }}
          onPathMouseLeave={() => {
            setTooltip({
              rect: null,
              properties: null,
            });
          }}
          onPathMouseMove={(e, d) => {
            setTooltip({
              rect: {
                top: e.clientY,
                left: e.clientX,
                right: e.clientX,
                bottom: e.clientY,
                x: e.clientX,
                y: e.clientY,
                width: 0,
                height: 0,
                toJSON: () => ({}),
              },
              properties: d,
            });
          }}
        />

        <HorizonalBarTooltip {...tooltip} config={config} />
      </div>

      {/* LEGEND */}
      <div className="relative shrink-0 min-w-[200px]">
        <h4 className="absolute left-0 font-semibold uppercase text-grey-20 -top-7">Legend</h4>
        <ul className="space-y-2.5">
          {DATA
            //
            .map((d) => (
              <li className="flex items-center h-3" key={d.id}>
                <div className="text-sm font-semibold">{d.label}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetDiagramHorizontalBar;
