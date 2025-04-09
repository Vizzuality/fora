import type { Dispatch } from 'react';
import { useCallback } from 'react';

import classNames from 'classnames';

import type { FlattenNode, Key } from 'rc-tree/lib/interface';

import type { TreeDataNode, TreeSelectOption, WithRequiredProperty } from './types';
import type { MatchResult } from './utils';
import { getParents } from './utils';

interface SearchOverlayProps {
  options: (WithRequiredProperty<Partial<FlattenNode<TreeDataNode>>, 'key' | 'title'> & {
    isSelected: boolean;
    matchingParts: MatchResult[];
    disabled?: boolean;
  })[];
  onChange: Dispatch<Key>;
}

const SearchOverlay = ({ options, onChange }: SearchOverlayProps) => {
  const getHandleChange = useCallback(
    (value: TreeSelectOption['value']) => onChange(value),
    [onChange],
  );

  return (
    <div data-testid="tree-select-search-results">
      {options.map(({ matchingParts, data: { label }, key, isSelected, parent, disabled }) => {
        const parents = getParents({ parent } as FlattenNode<TreeDataNode>);
        return (
          <button
            title={label}
            type="button"
            className={classNames('w-full p-2 text-left text-sm', {
              'text-navy-400 hover:bg-navy-50 cursor-pointer font-bold': isSelected,
              'pointer-events-none cursor-default text-gray-300 hover:bg-white': disabled,
              'hover:bg-navy-50 cursor-pointer text-gray-900': !isSelected && !disabled,
            })}
            key={key}
            onClick={() => !disabled && getHandleChange(key as string)}
          >
            {matchingParts.map(({ value, isMatch }, i) => {
              return (
                <span className={classNames({ 'font-bold': isMatch })} key={`${value}-${i}`}>
                  {value}
                </span>
              );
            })}
            {parents.length !== 0 && (
              <>
                {' '}
                <span className="italic text-gray-400">
                  ({parents.map(({ data }) => data.label).join(', ')})
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SearchOverlay;
