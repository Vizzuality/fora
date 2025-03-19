import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import { cn } from 'lib/utils';

import { LuEye, LuLockKeyhole, LuUsers } from 'react-icons/lu';

const ICON_CLASSES = 'w-4 h-4';

function renderIcon(icon: ComponentProps<typeof VisibilityLabel>['icon']): ReactNode {
  if (icon === 'private') return <LuLockKeyhole className={ICON_CLASSES} />;
  if (icon === 'fora-members') return <LuUsers className={ICON_CLASSES} />;
  return <LuEye className={ICON_CLASSES} />;
}

export default function VisibilityLabel({
  children,
  icon = 'public',
  required = false,
  labelProps,
}: PropsWithChildren<{
  labelProps: ComponentProps<'label'>;
  icon?: 'private' | 'public' | 'fora-members';
  required?: boolean;
}>) {
  return (
    <label
      {...labelProps}
      className={cn(
        'flex items-center gap-1 font-semibold uppercase text-grey-0',
        labelProps.className,
      )}
    >
      {renderIcon(icon)}
      {children}
      {required && <span className="text-red-0">*</span>}
    </label>
  );
}
