import { useMemo } from 'react';

import { Widget } from 'types/widget';

import HorizontalBar from 'components/charts/horizontal-bar';

const WidgetDiagramHorizontalBar = ({ query }: Widget) => {
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
        <HorizontalBar data={DATA} />
      </div>

      {/* LEGEND */}
      <div className="relative shrink-0 min-w-[200px]">
        <h4 className="absolute left-0 font-semibold uppercase text-grey-20 -top-7">Legend</h4>
        <ul className="space-y-2.5">
          {DATA
            //
            .map((d) => (
              <li className="flex items-center h-3" key={d.id}>
                <div className="text-sm font-semibold">
                  {d.label} <strong className="font-bold">{d.value}</strong>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetDiagramHorizontalBar;
