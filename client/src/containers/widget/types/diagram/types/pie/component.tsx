import { useMemo, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useColorRamp } from 'hooks/widgets';

import { Widget } from '@/types/api/widget';
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
                className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex h-1/2 w-1/2 flex-col items-center justify-center divide-y divide-grey-40 px-2 text-center">
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
                  className="mr-2 h-3 w-3 rounded-full"
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
