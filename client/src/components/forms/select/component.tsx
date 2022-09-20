import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from 'react';

import cx from 'classnames';

import {
  useFloating,
  offset,
  flip,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  size,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';

import { THEME, SIZE } from 'components/forms/select/constants';
import Icon from 'components/icon';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';

import Option from './option';
import type { SelectProps, SelectContextProps } from './types';

export const SelectContext = createContext({} as SelectContextProps);

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const Select: React.FC<SelectProps> = ({
  theme = 'light',
  size: sz = 'md',
  placeholder = 'Select...',
  value,
  clearable,
  disabled,
  children,
  render,
  onChange = () => {},
}: SelectProps) => {
  const OPTIONS = useMemo(() => {
    return Children.map(children, (child) => isValidElement(child) && child.props);
  }, [children]);

  const listRef = useRef<Array<HTMLLIElement | null>>([]);
  const listLabelRef = useRef([
    placeholder,
    ...(Children.map(children, (child) => isValidElement(child) && child.props.label) ?? []),
  ]);

  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, OPTIONS.findIndex((o) => o.value === value) + 1)
  );
  const [controlledScrolling, setControlledScrolling] = useState(false);

  const { x, y, reference, floating, strategy, context, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 8 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight - 20}px`,
          });
        },
      }),
    ],
  });

  const floatingRef = refs.floating;

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, {
      enabled: !disabled,
    }),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listLabelRef,
      activeIndex,
      selectedIndex,
      onMatch: open ? setActiveIndex : setSelectedIndex,
    }),
  ]);

  // Update the selected index when the value changes and the active index is null.
  useLayoutEffect(() => {
    if (activeIndex === null) {
      setSelectedIndex(OPTIONS.findIndex((o) => o.value === value) + 1);
    }
  }, [activeIndex, value, OPTIONS]);

  // Scroll the active or selected item into view when in `controlledScrolling`
  // mode (i.e. arrow key nav).
  useLayoutEffect(() => {
    const floatingSelect = floatingRef.current;

    if (open && controlledScrolling && floatingSelect) {
      const item =
        activeIndex != null
          ? listRef.current[activeIndex]
          : selectedIndex != null
          ? listRef.current[selectedIndex]
          : null;

      if (item && prevActiveIndex != null) {
        const itemHeight = listRef.current[prevActiveIndex]?.offsetHeight ?? 0;

        const floatingHeight = floatingSelect.offsetHeight;
        const top = item.offsetTop;
        const bottom = top + itemHeight;

        if (top < floatingSelect.scrollTop) {
          floatingSelect.scrollTop -= floatingSelect.scrollTop - top + 5;
        } else if (bottom > floatingHeight + floatingSelect.scrollTop) {
          floatingSelect.scrollTop += bottom - floatingHeight - floatingSelect.scrollTop + 5;
        }
      }
    }
  }, [
    open,
    controlledScrolling,
    prevActiveIndex,
    activeIndex,
    floatingRef,
    selectedIndex,
    floating,
  ]);

  // Sync the height and the scrollTop values
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      const floatingSelect = refs.floating.current;

      if (open && floatingSelect && floatingSelect.clientHeight < floatingSelect.scrollHeight) {
        const item = listRef.current[selectedIndex];
        if (item) {
          floatingSelect.scrollTop =
            item.offsetTop - floatingSelect.offsetHeight / 2 + item.offsetHeight / 2;
        }
      }
    });
  }, [open, selectedIndex, refs]);

  return (
    <SelectContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        activeIndex,
        setActiveIndex,
        listRef: listRef,
        setOpen,
        onChange,
        getItemProps,
        dataRef: context.dataRef,
      }}
    >
      <button
        type="button"
        {...getReferenceProps({
          ref: reference,
          className: cx({
            [THEME[theme].container]: true,
            'opacity-50 cursor-default': disabled,
            [SIZE[sz]]: true,
          }),
        })}
      >
        {!!OPTIONS.find((o) => o.value === value) && render(OPTIONS.find((o) => o.value === value))}
        {!OPTIONS.find((o) => o.value === value) && placeholder}

        <Icon
          icon={CHEVRON_DOWN_SVG}
          className={cx({
            'absolute w-3 h-3 -translate-y-1/2 top-1/2 right-5': true,
            'transform transition-transform rotate-180 text-blue-500': open,
          })}
        />
      </button>

      <FloatingPortal>
        {open && (
          <FloatingOverlay className="z-50">
            <FloatingFocusManager context={context} preventTabbing>
              <div
                {...getFloatingProps({
                  ref: floating,
                  className: cx({
                    [THEME[theme].menu]: true,
                  }) as string,
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                  onPointerEnter() {
                    setControlledScrolling(false);
                  },
                  onPointerMove() {
                    setControlledScrolling(false);
                  },
                  onKeyDown() {
                    setControlledScrolling(true);
                  },
                })}
              >
                <ul>
                  {clearable && (
                    <Option value={null} theme={theme} label="Clear selection">
                      <span className="font-bold">Clear selection</span>
                    </Option>
                  )}

                  {Children.map(
                    children,
                    (child, index) =>
                      isValidElement(child) && cloneElement(child, { index: 1 + index })
                  )}
                </ul>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </SelectContext.Provider>
  );
};

export default Select;
