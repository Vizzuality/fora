import { useCallback } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { TabsProps } from './types';

const Tabs: React.FC<TabsProps> = ({ items, selected, theme = 'green', onChange }: TabsProps) => {
  const handleClick = useCallback(
    (id: string) => {
      if (onChange && id !== selected) onChange(id);
    },
    [selected, onChange]
  );

  return (
    <div className="flex">
      {items.map((t, index) => (
        <button
          key={t.id}
          type="button"
          className={cx({
            'text-base font-semibold px-8 py-3 block leading-normal text-center': true,
            'rounded-l-lg': index === 0,
            'rounded-r-lg': index === items.length - 1,
            [THEME[theme].base]: selected !== t.id,
            [THEME[theme].active]: selected === t.id,
          })}
          onClick={() => handleClick(t.id)}
          role="tablist"
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
