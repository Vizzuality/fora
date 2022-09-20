import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
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

import { THEME, SIZE } from 'components/forms/multiselect/constants';
import Icon from 'components/icon';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';

import Option from './option';
import type { MultiSelectProps, MultiSelectContextProps } from './types';

export const MultiSelectContext = createContext({} as MultiSelectContextProps);

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  theme = 'light',
  size: sz = 'md',
  placeholder = 'Select multiple...',
  value = [],
  clearable,
  allable,
  disabled,
  children,
  render,
  onChange = () => {},
}: MultiSelectProps) => {
  const listItems = useMemo(() => {
    return Children.map(children, (child) => isValidElement(child) && child.props);
  }, [children]);

  const listRef = useRef<Array<HTMLLIElement | null>>([]);
  const listLabelRef = useRef([
    placeholder,
    ...(Children.map(children, (child) => isValidElement(child) && child.props.label) ?? []),
  ]);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(value);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prevActiveIndex = usePrevious<number | null>(activeIndex);
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

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, {
      enabled: !disabled,
    }),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listLabelRef,
      activeIndex,
      onMatch: setActiveIndex,
    }),
  ]);

  const floatingRef = refs.floating;

  // Scroll the active or selected item into view when in `controlledScrolling`
  // mode (i.e. arrow key nav).
  useLayoutEffect(() => {
    const floatingSelect = floatingRef.current;

    if (open && controlledScrolling && floatingSelect) {
      const item = activeIndex != null ? listRef.current[activeIndex] : null;

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
  }, [open, controlledScrolling, prevActiveIndex, activeIndex, floatingRef, floating]);

  return (
    <MultiSelectContext.Provider
      value={{
        values,
        setValues,
        activeIndex,
        setActiveIndex,
        onChange,
        listRef,
        listItems,
        setOpen,
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
        {!values.length && placeholder}
        {!!values.length && render(values.map((v) => listItems.find((i) => i.value === v)))}

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
          <FloatingOverlay>
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
                    <Option value="clear" theme={theme} label="Clear selection" index={0}>
                      <span className="font-bold">Clear selection</span>
                    </Option>
                  )}

                  {allable && (
                    <Option value="all" theme={theme} label="Select all" index={1}>
                      <span className="font-bold">Select all</span>
                    </Option>
                  )}

                  {Children.map(
                    children,
                    (child, index) =>
                      isValidElement(child) && cloneElement(child, { index: 2 + index })
                  )}
                </ul>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </MultiSelectContext.Provider>
  );
};

export default MultiSelect;
