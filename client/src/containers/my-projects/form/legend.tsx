import { ComponentProps } from 'react';

import { cn } from 'lib/utils';

import Icon from 'components/icon';

import FORA_MEMBERS_SVG from 'svgs/form/fora-members.svg?sprite';
import PRIVATE_SVG from 'svgs/form/private.svg?sprite';
import PUBLIC_SVG from 'svgs/form/public.svg?sprite';

const LEGEND_ITEMS: {
  label: string;
  icon: ComponentProps<typeof Icon>['icon'];
}[] = [
  {
    label: 'Private Information',
    icon: PRIVATE_SVG,
  },
  {
    label: 'Public Information',
    icon: PUBLIC_SVG,
  },
  {
    label: 'Only FORA members',
    icon: FORA_MEMBERS_SVG,
  },
];

export default function FormLegend({ className }: { className?: HTMLUListElement['className'] }) {
  return (
    <ul className={cn('flex gap-4 p-3 bg-grey-60', className)}>
      {LEGEND_ITEMS.map(({ label, icon }) => (
        <li key={label} className="flex items-center gap-1 text-grey-20 font-semibold">
          <Icon icon={icon} />
          {label}
        </li>
      ))}
    </ul>
  );
}
