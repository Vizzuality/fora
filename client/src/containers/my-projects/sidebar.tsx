import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from 'lib/utils';

import LinkButton from 'components/button';

export default function MyProjectsSidebar({
  sections,
}: {
  sections: {
    label: string;
    value: string;
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
              className={cn('uppercase font-semibold justify-start px-4', {
                'bg-green-80':
                  queryParams.get('step')?.includes(step.value) ??
                  sections?.[0].value === step.value,
              })}
            >
              {step.label}
            </LinkButton>
          </li>
        ))}
      </ul>
    </aside>
  );
}
