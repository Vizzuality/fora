import { ComponentProps } from 'react';

import { render } from '@testing-library/react';
import { expect } from 'vitest';

import Sidebar from './sidebar';

const TEST_SECTIONS: ComponentProps<typeof Sidebar>['sections'] = [
  {
    label: 'Test label 1',
    value: 'test-1',
  },
  {
    label: 'Test label 2',
    value: 'test-2',
  },
  {
    label: 'Test label 3',
    value: 'test-3',
  },
];

const TEST_PATHNAME = '/test-pathname';
const ACTIVE_CLASS = 'bg-green-80';

vi.mock('next/navigation', () => ({
  usePathname: () => TEST_PATHNAME,
  useSearchParams: () => new URLSearchParams({ step: TEST_SECTIONS[0].value }),
}));

describe('sidebar', () => {
  const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
  const sections = container.querySelectorAll('li');

  it('renders the correct number of sections', () => {
    expect(sections).toHaveLength(TEST_SECTIONS.length);
  });

  it('renders a section with the correct name', () => {
    expect(sections[0].querySelector('a')?.textContent).toBe(TEST_SECTIONS[0].label);
  });

  it('renders a section the correct href', () => {
    expect(sections[0].querySelector('a')).toHaveAttribute(
      'href',
      `${TEST_PATHNAME}?step=${TEST_SECTIONS[0].value}`
    );
  });

  it('expects the selected section to have the active class applied', () => {
    expect(sections[0].querySelector('a')).toHaveClass(ACTIVE_CLASS);
  });

  it('expects other sections (not the selected one) to not have the active class applied ', () => {
    expect(sections[1].querySelector('a')).not.toHaveClass(ACTIVE_CLASS);
    expect(sections[2].querySelector('a')).not.toHaveClass(ACTIVE_CLASS);
  });
});
