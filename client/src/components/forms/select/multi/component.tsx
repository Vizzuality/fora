import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import { Checkbox } from 'components/forms';
import THEME from 'components/forms/select/constants/theme';
import Icon from 'components/icon';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';
import CHEVRON_UP_SVG from 'svgs/ui/chevron-up.svg?sprite';

import type { MultiSelectProps } from './types';

export const Select: FC<MultiSelectProps> = (props: MultiSelectProps) => {
  const {
    batchSelectionActive = false,
    batchSelectionLabel = 'Select all',
    clearSelectionActive = false,
    clearSelectionLabel = 'Clear all',
    disabled = false,
    options,
    placeholder = 'Select...',
    size = 'base',
    theme = 'dark',
    onSelect,
    values,
  } = props;
  const ref = useRef(null);
  const initialValue = values || [];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  const SELECTED = useMemo(() => {
    if (!selected.length) return placeholder || 'Select items';

    if (selected.length === 1) {
      const option = options.find((o) => o.value === selected[0]);
      if (option) return option.label;
      return null;
    }

    if (selected.length > 1) return `Selected items (${selected.length})`;

    return null;
  }, [options, placeholder, selected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);

  useEffect(() => {
    setSelected(values);
  }, [values]);

  const handleSelect = useCallback(
    (option) => {
      const newSelected = [...selected];
      const index = selected.indexOf(option.value);

      if (index === -1) {
        newSelected.push(option.value);
      } else {
        newSelected.splice(index, 1);
      }
      setSelected(newSelected);
      if (onSelect) {
        onSelect(newSelected);
      }
    },
    [onSelect, selected]
  );

  const handleSelectAll = useCallback(() => {
    const allOptions = options.map((o) => o.value);
    setSelected(allOptions);
    if (onSelect) {
      onSelect(allOptions);
    }
  }, [onSelect, options]);

  const handleClearAll = useCallback(() => {
    setSelected([]);
    if (onSelect) {
      onSelect([]);
    }
  }, [onSelect]);

  return (
    <div className="flex -mt-2">
      <div
        className={cx({
          'w-full': true,
          [THEME[theme].container]: true,
        })}
      >
        <Listbox
          as="div"
          className="space-y-1"
          disabled={disabled}
          value={selected}
          onChange={handleSelect}
        >
          {() => (
            <>
              <div className="relative space-y-3" ref={ref}>
                <span className="inline-block w-full">
                  <Listbox.Button
                    className={cx({
                      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-grey-0 rounded-lg':
                        true,
                      'border border-grey-0/40 text-grey-0/40': disabled,
                      [THEME.sizes[size]]: true,
                      [THEME[theme].open.button]: isOpen,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="block truncate">{SELECTED}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Icon
                        icon={isOpen ? CHEVRON_UP_SVG : CHEVRON_DOWN_SVG}
                        className={cx({
                          'w-3 h-3': true,
                        })}
                      />
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className={cx({
                    'z-10 absolute w-full overflow-y-auto rounded-lg shadow-lg min-w-[250px]': true,
                    [THEME[theme].button[size]]: true,
                  })}
                >
                  <Listbox.Options
                    static
                    className={cx({
                      'py-1 overflow-y-auto text-base leading-6 max-h-60 focus:outline-none': true,
                      [THEME[theme].menu]: true,
                    })}
                  >
                    <div className="flex ml-2 text-sm">
                      {batchSelectionActive && (
                        <button
                          className="px-4 py-2 text-left underline text-grey-20"
                          type="button"
                          onClick={handleSelectAll}
                        >
                          {batchSelectionLabel}
                        </button>
                      )}
                      {clearSelectionActive && (
                        <button
                          className="px-4 py-2 text-left underline"
                          type="button"
                          onClick={handleClearAll}
                        >
                          {selected.length < 1 && clearSelectionLabel}
                          {selected.length > 1 &&
                            selected.length !== options.length &&
                            `${clearSelectionLabel} (${selected.length} Selected)`}
                          {selected.length === options.length &&
                            `${clearSelectionLabel} (All selected)`}
                        </button>
                      )}
                    </div>
                    {options.map((opt) => {
                      return (
                        <Listbox.Option key={opt.value} value={opt}>
                          {({ active }) => (
                            <div
                              className={cx({
                                'flex space-x-2 cursor-pointer select-none relative py-2 pl-5 pr-4':
                                  true,
                                [THEME[theme].item.base]: true,
                                [THEME[theme].item.active]: active,
                              })}
                            >
                              <Checkbox
                                className="cursor-pointer focus:text-black focus:ring-black checked:bg-black"
                                checked={selected.includes(opt.value)}
                                readOnly
                              />

                              <span
                                className={cx({
                                  'font-semibold block line-clamp-2': true,
                                })}
                              >
                                {opt.label}
                              </span>
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default Select;
