import { useContext } from 'react';

import cx from 'classnames';

import { SelectContext } from 'components/forms/select/component';
import THEME from 'components/forms/select/constants';

import { OptionProps } from './types';

export const Option: React.FC<OptionProps> = ({
  children,
  index = 0,
  theme,
  value,
  disabled,
}: OptionProps) => {
  const {
    selectedIndex,
    setSelectedIndex,
    listRef,
    setOpen,
    onChange,
    activeIndex,
    setActiveIndex,
    getItemProps,
    dataRef,
  } = useContext(SelectContext);

  const handleSelect = () => {
    setSelectedIndex(index);
    onChange(value);
    setOpen(false);
    setActiveIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || (event.key === ' ' && !dataRef.current.typing)) {
      event.preventDefault();
      return handleSelect();
    }
  };

  return (
    <li
      className={cx({
        [THEME[theme].item.base]: true,
        'focus:bg-blue-0 focus:text-white': true,
        'pointer-events-none opacity-50': disabled,
      })}
      role="option"
      ref={(node) => (listRef.current[index] = node)}
      tabIndex={activeIndex === index ? 0 : 1}
      // activeIndex === index prevents VoiceOver stuttering.
      aria-selected={activeIndex === index && selectedIndex === index}
      data-selected={selectedIndex === index}
      aria-disabled={disabled}
      {...getItemProps({
        onClick: handleSelect,
        onKeyDown: handleKeyDown,
      })}
    >
      {children}
    </li>
  );
};

export default Option;
