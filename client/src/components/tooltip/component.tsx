import { cloneElement, Fragment, isValidElement, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import {
  arrow,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
  useFloating,
  useInteractions,
  useClick,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';

import { TooltipProps } from './types';

export const Tooltip = ({
  children,
  content,
  enabled = true,
  trigger = 'hover',
  placement = 'top',
  virtual = false,
  virtualDOMRect,
  middlewares = {
    offset: true,
    flip: true,
    shift: true,
    size: true,
  },
  arrowProps = {
    enabled: false,
    size: 8,
    className: 'bg-white',
  },
  portalProps = {
    enabled: true,
  },
  useHoverProps = {},
  useClickProps = {},
}: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef<HTMLDivElement>(null);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    middlewareData,
    placement: fPlacement,
  } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      ...(middlewares.offset ? [offset(5)] : []),
      ...(middlewares.flip ? [flip()] : []),
      ...(middlewares.shift ? [shift({ padding: 8 })] : []),
      ...(middlewares.size
        ? [
            size({
              apply({ availableWidth, availableHeight, elements }) {
                // Do things with the data, e.g.
                Object.assign(elements.floating.style, {
                  maxWidth: `${availableWidth - 50}px`,
                  maxHeight: `${availableHeight - 25}px`,
                });
              },
            }),
          ]
        : []),
      ...(arrowRef.current && arrowProps.enabled
        ? [
            arrow({
              element: arrowRef.current,
            }),
          ]
        : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: trigger === 'hover' && !virtual && enabled,
      restMs: 40,
      ...useHoverProps,
    }),
    useClick(context, {
      enabled: trigger === 'click' && !virtual && enabled,
      ...useClickProps,
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context, {
      enabled: !virtual,
    }),
  ]);

  // Portal
  const Portal = portalProps.enabled ? FloatingPortal : Fragment;

  // Arrow
  const { arrow: arrowStyle = {} as any } = middlewareData;
  const { x: arrowX, y: arrowY } = arrowStyle;

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[fPlacement.split('-')[0]];

  useEffect(() => {
    if (virtual && virtualDOMRect) {
      reference({
        getBoundingClientRect() {
          return virtualDOMRect;
        },
      });
      setOpen(true);
    }

    if (virtual && !virtualDOMRect) {
      setOpen(false);
    }
  }, [reference, virtual, virtualDOMRect]);

  return (
    <>
      {!virtual &&
        isValidElement(children) &&
        cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}

      <Portal {...portalProps}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                ...(virtual && {
                  transition: {
                    duration: 0,
                  },
                }),
              }}
              className="z-50 flex pointer-events-none"
              {...getFloatingProps({
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? '',
                  left: x ?? '',
                },
              })}
            >
              {content}

              {arrowProps.enabled && (
                <div
                  ref={arrowRef}
                  className={cx({
                    'absolute rotate-45 bg-white': true,
                    [arrowProps.className]: true,
                  })}
                  style={{
                    width: arrowProps.size,
                    height: arrowProps.size,
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: -arrowProps.size / 2,
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default Tooltip;
