import React, { useCallback } from 'react';

import { Geography as RSMGeography } from 'react-simple-maps';

import cx from 'classnames';

export interface GeographyProps {
  geo: any;
  onClick?: (e: React.MouseEvent, properties: Record<string, any>) => void;
  onMouseEnter?: (e: React.MouseEvent, properties: Record<string, any>) => void;
  onMouseLeave?: (e: React.MouseEvent, properties: Record<string, any>) => void;
  onMouseMove?: (e: React.MouseEvent, properties: Record<string, any>) => void;
}

const Geography = ({ geo, onClick, onMouseEnter, onMouseLeave, onMouseMove }) => {
  const { id, properties } = geo;
  const { style } = properties;
  // CALLBACKS
  const handleClick = useCallback(
    (e) => {
      if (onClick) onClick(e, { id, ...properties });
    },
    [id, properties, onClick]
  );

  const handleMouseEnter = useCallback(
    (e) => {
      if (onMouseEnter) onMouseEnter(e, { id, ...properties });
    },
    [id, properties, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      if (onMouseLeave) onMouseLeave(e, { id, ...properties });
    },
    [id, properties, onMouseLeave]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (onMouseMove) onMouseMove(e, { id, ...properties });
    },
    [id, properties, onMouseMove]
  );

  return (
    <RSMGeography
      geography={geo}
      style={style}
      className={cx({
        'cursor-pointer': !!onClick,
        'pointer-events-none': !onClick,
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Geography;
