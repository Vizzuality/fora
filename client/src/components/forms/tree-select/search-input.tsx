import type { InputHTMLAttributes } from 'react';

import { LuX } from 'react-icons/lu';

import { cn } from '@/lib/utils';

import type { CommonTreeProps } from './types';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: CommonTreeProps['theme'];
  resetSearch: () => void;
}

const SearchInput = ({
  autoFocus,
  value,
  placeholder,
  disabled,
  theme,
  resetSearch,
  ...inputProps
}: SearchInputProps) => {
  return (
    <>
      <input
        autoFocus={autoFocus}
        type="search"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        {...inputProps}
        className={cn(
          'h-[32px] w-full appearance-none truncate border-none bg-transparent p-0 py-2 pl-2 text-sm focus:ring-0',
          {
            'placeholder:text-gray-300': disabled,
            'placeholder:text-grey-0': !disabled,
            [inputProps.className]: !!inputProps.className,
          },
        )}
      />
      {value && (
        <button type="button" onClick={resetSearch} className="flex-shrink-0">
          <LuX className="h-4 w-4 text-grey-0" />
        </button>
      )}
    </>
  );
};

export default SearchInput;
