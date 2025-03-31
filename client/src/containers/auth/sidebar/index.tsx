import { usePathname, useSearchParams } from 'next/navigation';

import LinkButton from '@/components/button';
import { cn } from '@/lib/utils';

export default function Sidebar({
  sections,
}: {
  sections: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}) {
  const pathname = usePathname();
  const queryParams = useSearchParams();

  return (
    <aside>
      <ul className="flex flex-col gap-2">
        {sections.map((step) => (
          <li key={step.value}>
            <LinkButton
              href={`${pathname}?step=${step.value}`}
              theme="transparent-alt"
              className={cn('justify-start px-4 font-semibold uppercase', {
                'bg-green-80':
                  queryParams.get('step')?.includes(step.value) ??
                  sections?.[0].value === step.value,
              })}
              disabled={step.disabled}
            >
              {step.label}
            </LinkButton>
          </li>
        ))}
      </ul>
    </aside>
  );
}
