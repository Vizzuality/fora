import { ReactNode } from 'react';

import { cn } from 'lib/utils';

import { LuLockKeyhole, LuEye, LuUsers } from 'react-icons/lu';

const ICON_CLASSES = 'w-4 h-4';

const LEGEND_ITEMS: {
  label: string;
  icon: ReactNode;
}[] = [
  {
    label: 'Private Information',
    icon: <LuLockKeyhole className={ICON_CLASSES} />,
  },
  {
    label: 'Public Information',
    icon: <LuEye className={ICON_CLASSES} />,
  },
  {
    label: 'Only FORA members',
    icon: <LuUsers className={ICON_CLASSES} />,
  },
];

export default function FormLegend({ className }: { className?: HTMLUListElement['className'] }) {
  return (
    <ul className={cn('flex gap-4 p-3 bg-grey-60', className)}>
      {LEGEND_ITEMS.map(({ label, icon }) => (
        <li key={label} className="flex items-center gap-1 text-grey-20 font-semibold">
          {icon}
          {label}
        </li>
      ))}
    </ul>
  );
}
