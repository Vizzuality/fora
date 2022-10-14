import React, { useCallback } from 'react';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import CHROMA from 'chroma-js';

import { MAP_RAMP } from 'constants/colors';

import type { ListItemProps } from './types';

const ListItem: React.FC<ListItemProps> = ({ id, name, count, max }) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const dispatch = useAppDispatch();

  const COLOR_SCALE = CHROMA.scale(MAP_RAMP);
  const COLOR = COLOR_SCALE(1 - count / max);

  const handleClick = useCallback(() => {
    dispatch(
      setFilters({
        ...filters,
        subgeographics: [id],
      })
    );
  }, [id, filters, dispatch]);

  return (
    <li
      className="flex justify-between space-x-10 font-normal capitalize cursor-pointer text-grey-0"
      onClick={handleClick}
    >
      <h5 className="flex items-start space-x-2">
        <span
          className="block w-3 h-3 mt-1 rounded-full shrink-0"
          style={{ backgroundColor: COLOR }}
        />
        <span>{name}</span>
      </h5>
      <span className="block font-bold">{count}</span>
    </li>
  );
};

export default ListItem;