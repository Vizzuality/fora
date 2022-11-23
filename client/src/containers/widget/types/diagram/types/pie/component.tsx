import { useMemo, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Widget } from 'types/widget';

import { useColorRamp } from 'hooks/widgets';

import Pie from 'components/charts/pie';

type PieData = {
  id: string;
  label: string;
  value: number;
};

const WidgetDiagramPie = ({ query }: Widget) => {
  const { data } = query;

  const [highlighted, setHighlighted] = useState<PieData>(null);

  const DATA = useMemo<PieData[]>(() => {
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

  const HIGHLIGHTED = useMemo(() => {
    if (!highlighted) return DATA[0];

    return highlighted;
  }, [highlighted, DATA]);

  const COLOR_SCALE = useColorRamp(DATA);

  return (
    <div className="flex space-x-10">
      {/* CHART */}
      <div className="shrink-0">
        <div className="relative">
          <Pie
            width={250}
            height={250}
            data={DATA}
            selected={HIGHLIGHTED?.id}
            onPathMouseEnter={(props) => setHighlighted(props)}
          />

          <AnimatePresence>
            {HIGHLIGHTED && (
              <motion.div
                className="absolute top-0 left-0 flex items-center justify-center w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col items-center justify-center w-1/2 px-2 text-center divide-y h-1/2 divide-grey-40">
                  <div className="py-1 text-xl">{HIGHLIGHTED.value}</div>
                  <div className="py-1 text-base">{HIGHLIGHTED.label}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-5 grow space-y-2.5">
        <h4 className="font-semibold uppercase text-grey-20">Legend</h4>
        <ul className="space-y-1">
          {DATA
            //
            .map((d) => (
              <li
                className="flex items-center"
                key={d.id}
                onMouseEnter={() => {
                  setHighlighted(d);
                }}
              >
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
