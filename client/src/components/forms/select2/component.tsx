import React, { FC, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import { Listbox, Transition } from '@headlessui/react';

import THEME from 'components/forms/select2/constants/theme';
import Icon from 'components/icon';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';
import CHEVRON_UP_SVG from 'svgs/ui/chevron-up.svg?sprite';

import Checkbox from '../checkbox';

import type { Select2Props } from './types';

export const Select2: FC<Select2Props> = (props: Select2Props) => {
  const {
    batchSelectionActive = false,
    batchSelectionLabel = 'Select all',
    clearSelectionActive = false,
    clearSelectionLabel = 'Clear all',
    disabled = false,
    multiple = false,
    options,
    placeholder = 'Select...',
    size = 'base',
    theme = 'dark',
    onSelect,
  } = props;
  const ref = useRef(null);
  const initialValue = multiple ? [] : null;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);

  const isSelected = (value) => {
    if (multiple) return selected.find((el) => el === value) ? true : false;
    return selected === value ? true : false;
  };

  const handleDeselect = (value) => {
    const selectedUpdated = selected.filter((el) => el !== value);
    setSelected(selectedUpdated);
    setIsOpen(true);
  };

  const handleSelect = (value) => {
    if (!multiple) {
      setIsOpen(!isOpen);
      return setSelected(value);
    }
    if (!isSelected(value) && multiple) {
      const selectedUpdated = [...selected, options.find((el) => el === value)];
      return setSelected(selectedUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  };

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
                      [THEME.sizes[size]]: true,
                      [THEME[theme].open.button]: isOpen,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {multiple && (
                      <span className="block truncate">
                        {selected.length < 1 && 'Select items'}
                        {selected.length === 1 && selected[0].label}
                        {selected.length >= 2 && `Selected items (${selected.length})`}
                      </span>
                    )}
                    {!multiple && <span className="block truncate">{selected || placeholder}</span>}
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
                    <div className="flex justify-between ml-2 text-sm">
                      {batchSelectionActive && multiple && (
                        <button
                          className="px-4 py-2 text-left underline text-grey-20"
                          type="button"
                          onClick={() => setSelected(options)}
                        >
                          {batchSelectionLabel}
                        </button>
                      )}
                      {clearSelectionActive && multiple && (
                        <button
                          className="px-4 py-2 text-left underline"
                          type="button"
                          onClick={() => setSelected(initialValue)}
                        >
                          {selected.length < 1 && clearSelectionLabel}
                          {selected.length > 1 && `${clearSelectionLabel} (${selected.length})`}
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
                              {multiple && (
                                <>
                                  <Checkbox
                                    className="cursor-pointer focus:text-black focus:ring-black checked:bg-black"
                                    checked={selected.includes(opt)}
                                    readOnly
                                  />
                                </>
                              )}

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

export default Select2;
