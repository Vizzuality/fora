import { ReactNode } from 'react';

import { LuEye, LuLockKeyhole, LuUsers } from 'react-icons/lu';

import { cn } from '@/lib/utils';

const ICON_CLASSES = 'w-4 h-4 text-grey-0';

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
    <ul
      className={cn(
        'inline-flex gap-4 justify-self-start rounded-lg border border-grey-0 bg-grey-60 p-3',
        className,
      )}
    >
      {LEGEND_ITEMS.map(({ label, icon }) => (
        <li key={label} className="flex items-center gap-1 font-semibold text-grey-0">
          {icon}
          {label}
        </li>
      ))}
    </ul>
  );
}
