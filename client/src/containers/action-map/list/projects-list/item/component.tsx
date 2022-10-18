import React, { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useAppSelector } from 'store/hooks';

import CHROMA from 'chroma-js';

// import type { Project } from 'hooks/projects/types';

import { MAP_RAMP } from 'constants/colors';

const ListItem = ({ id, title }) => {
  const { push } = useRouter();
  const { type } = useAppSelector((state) => state['/action-map']);

  const COLOR_SCALE = CHROMA.scale(MAP_RAMP);
  const COLOR = COLOR_SCALE(0.5);

  const handleClick = useCallback(() => {
    push({
      pathname: `/${type}/[id]`,
      query: { id },
    });
  }, [id, type, push]);

  return (
    <li
      className="flex justify-between space-x-10 font-normal capitalize cursor-pointer text-grey-0"
      onClick={handleClick}
    >
      <h5 className="flex items-start space-x-2 hover:underline">
        <span
          className="block w-3 h-3 mt-1 rounded-full shrink-0"
          style={{ backgroundColor: COLOR }}
        />
        <span>{title}</span>
      </h5>
      <span className="block font-bold">{Math.ceil(Math.random() * 20)}</span>
    </li>
  );
};

export default ListItem;