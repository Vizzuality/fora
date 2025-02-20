import Icon from 'components/icon';

import FORA_MEMBERS_SVG from 'svgs/form/fora-members.svg?sprite';
import PRIVATE_SVG from 'svgs/form/private.svg?sprite';
import PUBLIC_SVG from 'svgs/form/public.svg?sprite';
import { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '../../../lib/utils';

function renderIcon(
  icon: ComponentProps<typeof VisibilityLabel>['icon']
): ComponentProps<typeof Icon>['icon'] {
  if (icon === 'private') return PRIVATE_SVG;
  if (icon === 'fora-members') return FORA_MEMBERS_SVG;
  return PUBLIC_SVG;
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
        'flex items-center gap-1 text-grey-20 uppercase font-semibold',
        labelProps.className
      )}
    >
      <Icon icon={renderIcon(icon)} />
      {children}
      {required && <span className="text-red-0">*</span>}
    </label>
  );
}
