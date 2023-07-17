import { ChangeEvent, useMemo, useState } from 'react';
import { useCallback } from 'react';

import cx from 'classnames';

import Input from 'components/forms/input';
import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const THEME = {
  green: 'text-black placeholder-grey-0 bg-green-0 text-sm',
  white: 'text-grey-0 placeholder-grey-0 text-sm',
};

type SearchProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'icon' | 'theme' | 'onChange'
> & {
  onChange: (value: string) => void;
  theme?: 'green' | 'white';
};

export const Search: React.FC<SearchProps> = ({
  theme = 'white',
  onChange,
  value,
  ...rest
}: SearchProps) => {
  const [search, setSearch] = useState(value);

  const resetable = typeof search !== 'undefined' && search !== '';

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleReset = useCallback(() => {
    setSearch('');
    onChange?.('');
  }, [onChange]);

  useMemo(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="relative">
      <Input
        {...rest}
        value={search}
        type="search"
        className={cx({
          'w-full h-full py-3 px-4': true,
          [THEME[theme]]: true,
        })}
        onChange={handleChange}
      />

      {!!resetable && (
        <button
          className="absolute z-10 flex items-center self-center justify-center w-5 h-5 transform -translate-y-1/2 right-3 top-1/2 text-grey-0 hover:text-grey-20"
          type="button"
          onClick={handleReset}
        >
          <Icon icon={CLOSE_SVG} className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default Search;
