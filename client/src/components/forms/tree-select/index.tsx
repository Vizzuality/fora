import React, {
  EventHandler,
  Ref,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { TreeProps } from 'rc-tree';
import Tree from 'rc-tree';
import type { Key } from 'rc-tree/lib/interface';
import { flattenTreeData } from 'rc-tree/lib/utils/treeUtil';
import { LuChevronDown, LuX } from 'react-icons/lu'; // eslint-disable-next-line import/no-extraneous-dependencies
import { useDebouncedValue, useEffectOnceWhen } from 'rooks';

import { Checkbox } from '@/components/forms';
import { cn } from '@/lib/utils';
import Loading from 'components/loading';

import { FIELD_NAMES } from './constants';
import SearchInput from './search-input';
import SearchOverlay from './search-overlay';
import CustomSwitcherIcon from './switcher';
import type { TreeDataNode, TreeSelectOption, TreeSelectProps } from './types';
import { CHECKED_STRATEGIES, getParents, useTree } from './utils';

const THEMES = {
  default: {
    label: 'text-gray-900 text-xs',
    wrapper:
      'flex-row max-w-full bg-transparent relative border border-grey-40 transition-colors rounded-lg shadow-sm cursor-pointer min-h-[2.5rem] text-sm px-4',
    arrow: 'items-center text-gray-900',
    treeNodes:
      'flex gap-1 items-center p-2 pl-1 whitespace-nowrap text-sm cursor-pointer hover:bg-navy-50 z-[100]',
  },
  'inline-primary': {
    label: 'text-gray-900 text-xs',
    wrapper:
      'flex-row max-w-full relative border border-grey-0 transition-colors rounded-lg shadow-sm cursor-pointer min-h-[2.5rem] text-sm px-4',
    arrow: 'items-center text-gray-900',
    treeNodes:
      'flex gap-1 items-center p-2 pl-1 whitespace-nowrap text-sm cursor-pointer hover:bg-navy-50 z-[100]',
    treeContent: 'max-w-xl',
  },
  disabled:
    'flex-row max-w-full bg-gray-300/20 border border-gray-200 rounded-md shadow-sm cursor-default pointer-events-none min-h-[2.5rem] text-sm p-0.5 pr-0',
};

const CustomIcon: TreeProps<TreeDataNode>['icon'] = ({ checked, disabled }) => {
  return <Checkbox className="mr-2" checked={checked} disabled={disabled} readOnly />;
};

const InnerTreeSelect = <IsMulti extends boolean>(
  {
    current: currentRaw,
    loading,
    multiple,
    options = [],
    placeholder = '',
    showSearch = false,
    onChange,
    onSearch,
    className,
    theme = 'default',
    error = false,
    fitContent = true,
    checkedStrategy: checkedStrategyName = 'PARENT', // by default show child
    label,
    autoFocus = false,
    disabled = false,
  }: TreeSelectProps<IsMulti>,
  forwardedRef,
) => {
  const current = useMemo(() => {
    if (!currentRaw) {
      return null;
    }
    if (Array.isArray(currentRaw)) {
      return currentRaw;
    }
    return [currentRaw];
  }, [currentRaw]);
  const [isOpen, setIsOpen] = useState(autoFocus && (!current || current.length === 0));

  const checkedStrategy = CHECKED_STRATEGIES[checkedStrategyName];

  const listContainerRef = useRef<HTMLDivElement>(null);

  const {
    x,
    y,
    refs,
    strategy,
    refs: { reference: referenceElement },
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
    strategy: 'fixed',
    middleware: [offset({ mainAxis: 4 }), shift({ padding: 4 }), flip()],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: 'listbox' }),
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useDebouncedValue(searchTerm, 100);

  const [selected, setSelected] = useState<TreeSelectOption>(null);
  const [selectedKeys, setSelectedKeys] = useState<TreeProps<TreeDataNode>['selectedKeys']>([]);
  const [expandedKeys, setExpandedKeys] = useState<TreeProps<TreeDataNode>['expandedKeys']>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);

  const isOptionSelected = useCallback(
    (key: Key) => selectedKeys.includes(key) || selected?.value === key,
    [selected, selectedKeys],
  );

  const renderNode = useCallback(
    (node: TreeDataNode) => {
      return {
        ...node,
        className: cn(THEMES[theme].treeNodes, {
          'w-full': fitContent,
          'bg-navy-50 font-bold': !multiple && selected?.value === node?.value,
          'text-gray-300 cursor-default hover:bg-white': node.disabled,
        }),
      };
    },
    [fitContent, multiple, selected, theme],
  );

  const {
    filteredKeys: filteredOptionsKeys,
    filteredOptions,
    flatTreeData,
    treeData,
  } = useTree(options, debouncedSearch, { isOptionSelected, render: renderNode });

  const handleExpand: TreeProps<TreeDataNode>['onExpand'] = useCallback(
    (keys, { node, expanded }) => {
      // if the item is being closed, remove it from the expanded keys
      setExpandedKeys((prevKeys) => {
        const uniqueKeys = new Set(prevKeys);
        if (!expanded) {
          uniqueKeys.delete(node.key as Key);
        } else {
          uniqueKeys.add(node.key as Key);
        }
        return Array.from(uniqueKeys);
      });
    },
    [],
  );

  // Selection for non-multiple
  const handleSelect: TreeProps<TreeDataNode>['onSelect'] = useCallback(
    (keys, { node }) => {
      const currentSelection: TreeSelectOption = { label: node.label, value: node.value };
      setSelectedKeys(keys);
      setSelected(currentSelection);

      if (!multiple) {
        // TODO: type inference is not working here
        onChange?.(currentSelection as TreeSelectProps<IsMulti>['current']);
      }
      setIsOpen(false);
    },
    [multiple, onChange],
  );

  const handleReset = useCallback(() => {
    setSelectedKeys([]);
    setCheckedKeys([]);
    setSelected(null);
    onChange?.(null);
  }, [onChange]);

  // Only for multiple, find options depending on checked keys
  const currentOptions = useMemo<TreeSelectOption[]>(() => {
    const checkedOptions = [];
    if (checkedKeys) {
      (checkedKeys as string[]).forEach((key) => {
        const recursiveSearch = (arr) => {
          arr.forEach((opt) => {
            if (opt.value === key) checkedOptions.push(opt);
            if (opt.children) recursiveSearch(opt.children);
          });
        };
        recursiveSearch(options);
      });
    }
    return checkedOptions;
  }, [checkedKeys, options]);

  // Selection for multiple
  const handleCheck = useCallback<TreeProps<TreeDataNode>['onCheck']>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (checkedKeys: Key[], { checkedNodes }) => {
      // const root = fullTreeData.find((option) => checkedKeys.includes(option.key));
      // Depending of the checked strategy apply different filters
      const filteredValues = checkedStrategy(checkedKeys, checkedNodes) || [];

      // TODO: this function is repeated
      const checkedOptions: TreeSelectOption[] = [];
      filteredValues.forEach((key) => {
        const recursiveSearch = (arr: TreeSelectOption[]) => {
          arr.forEach((opt) => {
            if (opt.value === key) checkedOptions.push(opt);
            if (opt.children) recursiveSearch(opt.children);
          });
        };
        recursiveSearch(options);
      });

      if (multiple) {
        onChange?.(checkedOptions as TreeSelectProps<IsMulti>['current']);
      }
      setCheckedKeys(filteredValues);
    },
    [checkedStrategy, multiple, onChange, options],
  );

  // Search capability
  const handleSearch: EventHandler<SyntheticEvent<HTMLInputElement>> = useCallback(
    (e) => {
      e.stopPropagation();
      setSearchTerm(e.currentTarget.value);
      setIsOpen(true);
      onSearch?.(e.currentTarget.value);
    },
    [onSearch],
  );
  const resetSearch = useCallback(() => {
    setDebouncedSearch('');
    setSearchTerm('');
  }, [setDebouncedSearch]);

  // Current selection
  useEffect(() => {
    // Clear selection when current is empty
    if ((current && current.length === 0) || !current) {
      setSelected(null);
      setSelectedKeys([]);
      setCheckedKeys([]);
    }
    if (current && current.length) {
      const currentKeys = (current as TreeSelectOption[]).map(({ value }) => value);
      setSelected(current[0]);
      setSelectedKeys(currentKeys);
      setCheckedKeys(currentKeys);
    }
  }, [current]);

  useEffectOnceWhen(
    () => {
      const currentKeys = (current as TreeSelectOption[]).map(({ value }) => value);
      setExpandedKeys(currentKeys);
    },
    current && current.length > 0,
  );

  const [keyToScroll, setKeyToScroll] = useState<Key>();

  useEffect(() => {
    if (!listContainerRef.current || !keyToScroll) return;
    const listContainer = listContainerRef.current;

    const visibleFlattenedTreeData = flattenTreeData(treeData, expandedKeys, FIELD_NAMES);

    const elementIndex = visibleFlattenedTreeData.findIndex((node) => node.key === keyToScroll);

    if (elementIndex === -1) return;

    const listHeight = listContainer.clientHeight;

    // for some reason, there's an invisible .rc-tree-treenode outside of the list. With this selector we ensure to get the element only if it has a sibling of the same type
    const firstChild = listContainer.querySelector('.rc-tree-treenode ~ .rc-tree-treenode');

    // ELEMENT.getBoundingClientRect().height returns the height with decimals, and ELEMENT.clientHeight returns just the integer. If the list size is large, the decimals are enough to make the scroll not work properly
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const offset = firstChild?.getBoundingClientRect().height || 0;

    listContainer.scrollTop = offset * (elementIndex + 1) - listHeight / 2;
    setKeyToScroll(undefined);
  }, [keyToScroll, treeData, expandedKeys]);

  const handleSearchSelection = useCallback(
    (newKey: Key) => {
      resetSearch();

      const selectedNode = flatTreeData.find((data) => data.key === newKey);
      setKeyToScroll(newKey);
      const parentKeys = getParents(selectedNode).map((node) => node.key);
      const keysToExpand = [selectedNode.key, ...parentKeys];
      setExpandedKeys((currentKeys) => {
        const uniqueKeys = new Set([...currentKeys, ...keysToExpand]);
        return Array.from(uniqueKeys);
      });

      if (multiple) {
        setCheckedKeys((currentKeys) => {
          const newKeys = new Set(currentKeys);
          if (newKeys.has(newKey)) {
            newKeys.delete(newKey);
          } else {
            newKeys.add(newKey);
          }
          return Array.from(newKeys);
        });
        setSelectedKeys((currentKeys) => {
          const newKeys = new Set(currentKeys);
          const shouldDelete = newKeys.has(newKey);
          if (shouldDelete) {
            newKeys.delete(newKey);
          } else {
            newKeys.add(newKey);
          }

          const keys = Array.from(newKeys);
          const newCheckedKeys = new Set([...checkedKeys, ...keys]);
          if (shouldDelete) {
            newCheckedKeys.delete(newKey);
          }
          const newCheckedNodes = flatTreeData
            .filter((data) => newCheckedKeys.has(data.key))
            .map(({ data }) => data);
          const filteredValuesKeys =
            checkedStrategy(Array.from(newCheckedKeys), newCheckedNodes) || [];
          const newNodes = flatTreeData
            .filter((data) => filteredValuesKeys.includes(data.key))
            .map(({ data }) => data);
          onChange?.(newNodes as TreeSelectProps<IsMulti>['current']);
          return keys;
        });
      } else {
        if (selected?.value === selectedNode.key) {
          setSelected(null);
        } else {
          setSelected({ label: selectedNode.title as string, value: selectedNode.key as string });
          onChange?.({
            label: selectedNode.title as string,
            value: selectedNode.key as string,
          } as TreeSelectProps<IsMulti>['current']);
        }
      }
    },
    [resetSearch, flatTreeData, multiple, checkedKeys, checkedStrategy, onChange, selected],
  );

  return (
    <div className="min-w-0">
      <div
        {...(!disabled && {
          ...getReferenceProps({
            ref: refs.setReference,
            disabled,
          }),
        })}
        className={cn('w-full min-w-0', {
          [THEMES[theme].wrapper]: !disabled,
          [THEMES.disabled]: disabled,
          'focus:border-green-0 active:border-green-0': isOpen && !error,
          'flex flex-row items-center justify-between gap-1': true,
          'ring-1 ring-red-400': error,
          [className]: !!className,
        })}
      >
        <div
          className={cn(
            'flex h-full min-h-0 items-center gap-x-1 gap-y-0.5 overflow-hidden border-grey-40',
            // apply flex-1 to all children to wrap content nicely
            '[&>*]:flex-1',
            {
              'ring-navy-400': isOpen,
              'border-red-400': error,
            },
          )}
        >
          {label && <span className={cn(THEMES[theme].label)}>{label}</span>}
          {multiple ? (
            <>
              {(!currentOptions || !currentOptions.length) && !showSearch && (
                <span className="inline-block truncate text-gray-500">{placeholder}</span>
              )}
              {currentOptions?.length === 1 && (
                <span className="block truncate text-grey-0">{currentOptions[0].label}</span>
              )}

              {currentOptions?.length > 1 && (
                <span className="block truncate text-grey-0">
                  Selected items ({currentOptions.length})
                </span>
              )}
            </>
          ) : (
            <div
              className={cn('my-auto inline-flex min-h-[36px] min-w-0 items-center', {
                'pl-2': selected,
              })}
            >
              {selected ? (
                <span className="block w-full truncate text-gray-900">{selected.label}</span>
              ) : (
                // the placeholder is in the search input already
                showSearch || <span className="text-gray-500">{placeholder}</span>
              )}
              {!selected && (
                <div className="flex gap-2">
                  <SearchInput
                    value={searchTerm}
                    placeholder={selected === null ? placeholder : null}
                    theme={theme}
                    autoFocus={autoFocus}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                    }}
                    onKeyUp={(e) => {
                      // Pressing space closes the selector, so the event is prevented in that case
                      if (e.key !== ' ') return;
                      e.stopPropagation();
                      e.currentTarget.value += ' ';
                      handleSearch(e);
                    }}
                    onChange={handleSearch}
                    resetSearch={resetSearch}
                  />
                </div>
              )}
              {selected && (
                <button type="button" onClick={handleReset} className="shrink-0 px-2 py-0">
                  <LuX className="h-4 w-4 text-grey-0" />
                </button>
              )}
            </div>
          )}
          {multiple && showSearch && (
            <div className="flex gap-2">
              <SearchInput
                value={searchTerm}
                placeholder={selected === null ? placeholder : null}
                theme={theme}
                autoFocus={autoFocus}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                onKeyUp={(e) => {
                  // Pressing space closes the selector, so the event is prevented in that case
                  if (e.key !== ' ') return;
                  e.stopPropagation();
                  e.currentTarget.value += ' ';
                  handleSearch(e);
                }}
                onChange={handleSearch}
                resetSearch={resetSearch}
              />
            </div>
          )}
        </div>

        <span className="absolute right-0 pr-3">
          <LuChevronDown
            className={cn('h-5 w-5 text-grey-0', {
              'rotate-180': isOpen,
              'text-gray-300': disabled,
            })}
            aria-hidden="true"
          />
        </span>
      </div>
      {isOpen && (
        <div
          {...getFloatingProps({
            style: {
              position: strategy,
              top: y ?? '',
              left: x ?? '',
              minWidth: multiple ? 150 : 100,
              width:
                fitContent && refs.setReference
                  ? (referenceElement.current as HTMLElement)?.offsetWidth
                  : 'inherit',
            },
            className:
              'relative z-20 rounded-md overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5',
            ref: refs.setFloating,
          })}
        >
          <div
            ref={listContainerRef}
            className={cn(
              'max-h-80 overflow-y-auto bg-white',
              fitContent ? 'w-full max-w-full' : 'max-w-xs',
            )}
            id="list-container"
          >
            {loading ? (
              <div className="p-4">
                <Loading className="h5 text-navy-400 -ml-1 mr-3 w-5" />
              </div>
            ) : debouncedSearch ? (
              <>
                <SearchOverlay onChange={handleSearchSelection} options={filteredOptions} />
                {(options.length === 0 || (searchTerm && filteredOptionsKeys?.length === 0)) && (
                  <div className="mx-auto w-fit p-2 text-sm text-grey-0">No results</div>
                )}
              </>
            ) : (
              <>
                <Tree
                  className={cn({ hidden: loading || !!debouncedSearch })}
                  checkStrictly={false}
                  checkable={multiple}
                  selectable={!multiple}
                  multiple={multiple}
                  selectedKeys={selectedKeys}
                  expandedKeys={expandedKeys}
                  checkedKeys={checkedKeys}
                  icon={multiple && CustomIcon}
                  switcherIcon={CustomSwitcherIcon}
                  onExpand={handleExpand}
                  onSelect={handleSelect}
                  onCheck={handleCheck}
                  treeData={treeData}
                  fieldNames={FIELD_NAMES}
                  disabled={disabled}
                  ref={forwardedRef}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TreeSelect = React.forwardRef(InnerTreeSelect) as <IsMulti extends boolean = false>(
  props: TreeSelectProps<IsMulti> & {
    ref?: Ref<HTMLInputElement>;
  },
) => React.ReactElement;

export default TreeSelect;
