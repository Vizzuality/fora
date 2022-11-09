import { useColorRamp } from 'hooks/widgets';

import Pie from 'components/charts/pie';

const FAKE_DATA = [
  {
    id: 'a',
    label: 'Amazing',
    value: 10,
  },
  {
    id: 'b',
    label: 'Beautiful',
    value: 60,
  },
  {
    id: 'c',
    label: 'Cool',
    value: 30,
  },
  {
    id: 'd',
    label: 'Delightful',
    value: 40,
  },
  {
    id: 'e',
    label: 'Elegant',
    value: 50,
  },
].sort((a, b) => b.value - a.value);

const WidgetDiagramPie = () => {
  const COLOR_SCALE = useColorRamp(FAKE_DATA);

  return (
    <div className="flex space-x-10">
      {/* CHART */}
      <div className="shrink-0">
        <Pie
          width={250}
          height={250}
          data={FAKE_DATA}
          // onPathMouseClick={(props) => console.log(props)}
        />
      </div>

      {/* LEGEND */}
      <div className="mt-5 grow space-y-2.5">
        <h4 className="font-semibold uppercase text-grey-20">Legend</h4>
        <ul className="space-y-1">
          {FAKE_DATA
            //
            .map((d) => (
              <li className="flex items-center" key={d.id}>
                <div
                  className="w-3 h-3 mr-2 rounded-full"
                  style={{
                    backgroundColor: COLOR_SCALE(d.id),
                  }}
                />
                <div className="text-sm">
                  {d.label} <strong>{d.value}</strong>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetDiagramPie;
