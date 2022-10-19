import React, { useState, forwardRef, memo } from 'react';

import { motion } from 'framer-motion';

export interface GeographyProps {
  geography: any;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  style?: Record<string, any>;
  className?: string;
}

const AnimatedGeography = forwardRef<SVGPathElement, GeographyProps>(
  (
    {
      geography,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onFocus,
      onBlur,
      style = {},
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [isPressed, setPressed] = useState(false);
    const [isFocused, setFocus] = useState(false);

    function handleMouseEnter(evt) {
      setFocus(true);
      if (onMouseEnter) onMouseEnter(evt);
    }

    function handleMouseLeave(evt) {
      setFocus(false);
      if (isPressed) setPressed(false);
      if (onMouseLeave) onMouseLeave(evt);
    }

    function handleFocus(evt) {
      setFocus(true);
      if (onFocus) onFocus(evt);
    }

    function handleBlur(evt) {
      setFocus(false);
      if (isPressed) setPressed(false);
      if (onBlur) onBlur(evt);
    }

    function handleMouseDown(evt) {
      setPressed(true);
      if (onMouseDown) onMouseDown(evt);
    }

    function handleMouseUp(evt) {
      setPressed(false);
      if (onMouseUp) onMouseUp(evt);
    }

    return (
      <motion.path
        ref={ref}
        key={geography.rsmKey}
        tabIndex={0}
        className={`rsm-geography outline-none ${className}`}
        d={geography.svgPath}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        animate={style[isPressed || isFocused ? (isPressed ? 'pressed' : 'hover') : 'default']}
        transition={{ duration: 0.25 }}
        {...restProps}
      />
    );
  }
);

AnimatedGeography.displayName = 'AnimatedGeography';

export default memo(AnimatedGeography);
