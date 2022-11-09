import HorizontalBar from 'components/charts/horizontal-bar';

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
  {
    id: 'f',
    label: 'Fantastic',
    value: 20,
  },
  {
    id: 'g',
    label: 'Gorgeous',
    value: 30,
  },
  {
    id: 'h',
    label: 'Handsome',
    value: 40,
  },
  {
    id: 'i',
    label: 'Incredible',
    value: 50,
  },
].sort((a, b) => b.value - a.value);

const WidgetDiagramHorizontalBar = () => {
  return (
    <div className="flex pt-10 space-x-2">
      {/* CHART */}
      <div className="shrink-0 grow">
        <HorizontalBar data={FAKE_DATA} />
      </div>

      {/* LEGEND */}
      <div className="relative shrink-0 min-w-[200px]">
        <h4 className="absolute left-0 font-semibold uppercase text-grey-20 -top-7">Legend</h4>
        <ul className="space-y-2.5">
          {FAKE_DATA
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
