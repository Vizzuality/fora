import classNames from 'classnames';

import type { TreeProps } from 'rc-tree';
import { HiChevronDown } from 'react-icons/hi';

import type { TreeDataNode } from '../types';

const CustomSwitcherIcon: TreeProps<TreeDataNode>['switcherIcon'] = ({
  isLeaf,
  expanded,
  data,
}) => {
  if (isLeaf) return <span className="block w-4" />;

  const allChildrenDisabled = data.children.some(({ disabled }) => disabled);

  return (
    <HiChevronDown
      className={classNames('h-4 w-4 cursor-pointer', {
        '-rotate-90': !expanded,
        'fill-gray-900': !allChildrenDisabled,
        'fill-grey-300': allChildrenDisabled,
      })}
    />
  );
};

export default CustomSwitcherIcon;
