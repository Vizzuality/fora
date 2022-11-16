import { useMemo } from 'react';

import { Widget } from 'types/widget';

import { useColorRamp } from 'hooks/widgets';

import Pie from 'components/charts/pie';

const WidgetDiagramPie = ({ query }: Widget) => {
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

  const COLOR_SCALE = useColorRamp(DATA);

  return (
    <div className="flex space-x-10">
      {/* CHART */}
      <div className="shrink-0">
        <Pie
          width={250}
          height={250}
          data={DATA}
          // onPathMouseClick={(props) => console.log(props)}
        />
      </div>

      {/* LEGEND */}
      <div className="mt-5 grow space-y-2.5">
        <h4 className="font-semibold uppercase text-grey-20">Legend</h4>
        <ul className="space-y-1">
          {DATA
            //
            .map((d) => (
              <li className="flex items-center" key={d.id}>
                <div
                  className="w-3 h-3 mr-2 rounded-full"
                  style={{
                    backgroundColor: COLOR_SCALE(d.id),
                  }}
                />
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

export default WidgetDiagramPie;
