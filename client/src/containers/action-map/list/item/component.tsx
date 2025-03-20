import React from 'react';

import CHROMA from 'chroma-js';
import { max, min } from 'lodash';

import { MAP_RAMP } from 'constants/colors';

import type { ListItemProps } from './types';

const ListItem: React.FC<ListItemProps> = ({ name, count, data, onClick }) => {
  const MIN = min(data.map((d) => d.count)) || 0;
  const MAX = max(data.map((d) => d.count)) || 0;
  const VALUE = MAX === MIN ? 0.75 : 1 - count / MAX;

  const COLOR_SCALE = CHROMA.scale(MAP_RAMP);
  const COLOR = COLOR_SCALE(VALUE);

  return (
    <li
      className="flex cursor-pointer justify-between space-x-10 font-normal capitalize text-grey-0"
      onClick={onClick}
    >
      <h5 className="flex items-start space-x-2 hover:underline">
        <span
          className="mt-1 block h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: COLOR }}
        />
        <span>{name}</span>
      </h5>
      <span className="block font-bold">{count}</span>
    </li>
  );
};

export default ListItem;
