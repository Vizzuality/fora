import { useCallback, useContext } from 'react';

import cx from 'classnames';

import Checkbox from 'components/forms/checkbox';
import { MultiSelectContext } from 'components/forms/multiselect/component';
import THEME from 'components/forms/multiselect/constants';

import { OptionProps } from './types';

export const Option: React.FC<OptionProps> = ({
  children,
  index = 0,
  theme,
  value = '',
  disabled,
}: OptionProps) => {
  const {
    values = [],
    setValues,
    listRef,
    dataRef,
    listItems,
    activeIndex,
    onChange,
    getItemProps,
  } = useContext(MultiSelectContext);

  const handleMultiSelect = useCallback(() => {
    const newValues = [...values];

    if (value === 'clear') {
      setValues([]);
      onChange([]);
      return;
    }

    if (value === 'all') {
      const allValues = listItems.filter((item) => !item.disabled).map((item) => item.value);
      setValues(allValues);
      onChange(allValues);
      return;
    }

    if (newValues.includes(value)) {
      newValues.splice(newValues.indexOf(value), 1);
    } else {
      newValues.push(value);
    }

    setValues(newValues);
    onChange(newValues);
  }, [values, value, setValues, onChange, listItems]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || (event.key === ' ' && !dataRef.current.typing)) {
      event.preventDefault();
      return handleMultiSelect();
    }
  };

  return (
    <li
      className={cx({
        [THEME[theme].item.base]: true,
        [THEME[theme].item.checked]: values.includes(value),
        [THEME[theme].item.unchecked]: !values.includes(value),
        'focus:bg-blue-40 focus:text-white': true,
        'pointer-events-none opacity-50': disabled,
      })}
      role="option"
      ref={(node) => (listRef.current[index] = node)}
      tabIndex={activeIndex === index ? 0 : 1}
      // activeIndex === index prevents VoiceOver stuttering.
      aria-selected={activeIndex === index && values.includes(value)}
      data-selected={values.includes(value)}
      aria-disabled={disabled}
      {...getItemProps({
        onClick: handleMultiSelect,
        onKeyDown: handleKeyDown,
      })}
    >
      {value !== 'clear' && value !== 'all' && (
        <Checkbox className="cursor-pointer" checked={values.includes(value)} readOnly />
      )}
      <div className="cursor-pointer">{children}</div>
    </li>
  );
};

export default Option;
