import { useCallback } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { ButtonsGroupProps } from './types';

const ButtonsGroup: React.FC<ButtonsGroupProps> = ({
  items,
  selected,
  theme = 'green',
  onChange,
}: ButtonsGroupProps) => {
  const handleClick = useCallback(
    (id: string) => {
      if (onChange && id !== selected) onChange(id);
    },
    [selected, onChange]
  );

  return (
    <div className="flex space-x-4">
      {items.map((t) => (
        <button
          key={t.value}
          type="button"
          className={cx({
            'text-base font-semibold px-4 py-2 leading-normal text-center rounded-lg': true,
            [THEME[theme].base]: selected !== t.value,
            [THEME[theme].active]: selected === t.value,
          })}
          onClick={() => handleClick(t.value)}
          role="buttonlist"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonsGroup;
