import { useMemo } from 'react';

import type { DeepKeys } from '@tanstack/react-table';
// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js';
import { sortBy } from 'lodash';
import type { DataNode, Key } from 'rc-tree/lib/interface';
// eslint-disable-next-line import/no-extraneous-dependencies
import { flattenTreeData } from 'rc-tree/lib/utils/treeUtil';

import { FIELD_NAMES } from './constants';
import type { TreeDataNode, TreeSelectOption } from './types';

interface HasChildren<T> {
  children?: T[];
}

type Range = [start: number, end: number];

export interface MatchResult {
  /** The string slice */
  value: string;
  /** Wether the value is withing the specified ranges */
  isMatch: boolean;
}

export const splitStringByRange = (
  value: string,
  [start, end]: Range,
): readonly [string, string, string] => {
  const beginning = value.slice(0, start);
  const middle = value.slice(start, end + 1);
  const rest = value.slice(end + 1);
  return [beginning, middle, rest];
};

export const splitStringByIndexes = (value: string, indexes: readonly Range[]): MatchResult[] => {
  const titleParts: MatchResult[] = [];
  let currentChunk = value;
  for (const [start, end] of indexes) {
    if (!currentChunk) break;

    // Ranges are for the whole value, so they have to be adjusted to our slice
    const diff = value.length - currentChunk.length;
    const split = splitStringByRange(currentChunk, [start - diff, end - diff]);

    titleParts.push({ value: split[0], isMatch: false }, { value: split[1], isMatch: true });
    currentChunk = split[2];
  }

  // Add the end of the match to the result
  if (!!currentChunk) {
    titleParts.push({ value: currentChunk, isMatch: false });
  }
  // Remove possible empty strings
  const cleanedUp = titleParts.filter((part) => !!part.value);

  return cleanedUp;
};

const ALL = (checkedKeys: Key[], checkedNodes: TreeDataNode[]): DataNode['key'][] =>
  checkedNodes.map(({ value }) => value);

const PARENT = (checkedKeys: Key[], checkedNodes: TreeDataNode[]): TreeDataNode['value'][] => {
  // 1. Extracting parents selected
  const parentsWithChildren = checkedNodes.filter((node) => !!node?.children);
  // 2. Extracting children ids from parents selected above
  const childrenWithParents = [];
  if (parentsWithChildren && parentsWithChildren.length) {
    parentsWithChildren.forEach(({ children }) =>
      children.forEach(({ value }) => childrenWithParents.push(value)),
    );
  }
  // 3. Filtering checkedKeys with children ids to not send unnecessary values
  const filteredValues =
    childrenWithParents && childrenWithParents.length
      ? checkedKeys.filter((key) => !childrenWithParents.includes(key))
      : checkedKeys;
  return filteredValues;
};

const CHILD = (checkedKeys: Key[], checkedNodes: TreeDataNode[]): TreeDataNode['value'][] => {
  const onlyChildren = checkedNodes
    .filter((node) => !node.children || node.children.length === 0)
    .map(({ value }) => value);
  return onlyChildren;
};

export const CHECKED_STRATEGIES = { ALL, PARENT, CHILD };

export const flattenTree = <T extends HasChildren<T>>(tree: T) => {
  const flattenedTree = [tree];
  if (tree.children) {
    flattenedTree.push(...tree.children.flatMap((child) => flattenTree(child)));
  }

  return flattenedTree;
};

export const getParents = <T extends { parent?: T }>(node: T): T[] => {
  if (!node.parent) {
    return [];
  }
  const parent = node.parent;
  return [parent, ...getParents(parent)];
};

const filterTree = <T extends HasChildren<T>>(
  tree: T,
  filter: (node: T) => boolean,
  depth = 0,
): T | null => {
  const isValid = filter(tree);

  // base case: filter a leaf node
  if (!tree.children || tree.children.length === 0) {
    const value = isValid ? tree : null;
    return value;
  }

  // filter all children, get the valid ones
  const filteredChildren = tree.children
    .map((child) => filterTree(child, filter, depth + 1))
    .filter(Boolean);

  // if no children is valid, return the parent without children, ONLY if it's valid itself
  if (filteredChildren.length === 0) {
    return isValid ? { ...tree, index: depth, children: [] } : null;
  }

  return {
    ...tree,
    children: filteredChildren,
  };
};

const recursiveSortHelper = <T extends HasChildren<T>>(
  value: T,
  selector: ((value: T) => unknown) | DeepKeys<T>,
): T => {
  // @ts-expect-error fix later
  const children = value.children?.map((child) => recursiveSortHelper(child, selector));
  return { ...value, children: sortBy(children, selector) };
};

export const recursiveSort = <T extends HasChildren<T>>(
  values: T[],
  selector: ((value: T) => unknown) | DeepKeys<T>,
): T[] => {
  return sortBy(values, selector).map((value) => recursiveSortHelper(value, selector));
};

export const recursiveMap = <T extends HasChildren<T>, V extends Record<keyof unknown, unknown>>(
  value: T,
  mapper: (value: T) => V & HasChildren<V>,
): V => {
  const mappedValue = mapper(value);

  const children = value.children
    ? value.children?.map((child) => recursiveMap(child, mapper))
    : [];

  return {
    ...mappedValue,
    children,
  };
};

const getFilteredOptions = (options: TreeSelectOption[], search?: string) => {
  const filteredOptions = search
    ? options
        .map((opt) =>
          filterTree(opt, (node) => {
            const fuse = new Fuse([node], {
              includeScore: false,
              keys: ['label'],
              threshold: 0.4,
            });
            return fuse.search(search).length > 0;
          }),
        )
        .filter(Boolean)
    : options;

  return filteredOptions;
};

export interface UseTreeOptions {
  render: (node: Omit<TreeDataNode, 'className'>) => TreeDataNode;
  isOptionSelected: (id: Key) => boolean;
}

const optionToTreeData = (
  option: TreeSelectOption,
  render: UseTreeOptions['render'],
  depth = 0,
): TreeDataNode => {
  const children = option.children?.map((_option) => optionToTreeData(_option, render, depth + 1));
  return render({
    ...option,
    style: { paddingLeft: 16 * depth },
    children,
  });
};

export const useTree = (
  options: TreeSelectOption[],
  // eslint-disable-next-line @typescript-eslint/default-param-last
  search = '',
  { render, isOptionSelected }: UseTreeOptions,
) => {
  const filteredKeys = useMemo(() => {
    const filteredOptions = getFilteredOptions(options, search);
    const keys = filteredOptions.flatMap((opt) => flattenTree(opt).map(({ value }) => value));
    return keys;
  }, [options, search]);

  const treeData = useMemo(
    () => options.map((option) => optionToTreeData(option, render)),
    [options, render],
  );

  const flatTreeData = useMemo(() => flattenTreeData(treeData, true, FIELD_NAMES), [treeData]);

  const fuse = useMemo(
    () =>
      new Fuse(flatTreeData, {
        includeScore: false,
        keys: ['title'],
        threshold: 0.4,
        includeMatches: true,
      }),
    [flatTreeData],
  );

  const filteredOptions = useMemo(() => {
    const result = fuse.search(search);

    return result.map(({ item, matches }) => ({
      ...item,
      isSelected: isOptionSelected(item.key),
      matchingParts: splitStringByIndexes(matches[0].value, matches[0].indices),
    }));
  }, [fuse, search, isOptionSelected]);

  return { treeData, filteredKeys, flatTreeData, filteredOptions };
};
