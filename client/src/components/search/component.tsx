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
    [onChange],
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
          'h-full w-full py-3 px-4': true,
          [THEME[theme]]: true,
          '!border-grey-0': true,
        })}
        onChange={handleChange}
      />

      {!!resetable && (
        <button
          className="absolute right-3 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center self-center text-grey-0 hover:text-grey-20"
          type="button"
          onClick={handleReset}
        >
          <Icon icon={CLOSE_SVG} className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default Search;
