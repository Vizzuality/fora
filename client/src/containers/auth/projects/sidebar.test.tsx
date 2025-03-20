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
    disabled: true,
  },
];

const TEST_PATHNAME = '/test-pathname';
const ACTIVE_CLASS = 'bg-green-80';

const mockedHook = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  usePathname: () => TEST_PATHNAME,
  useSearchParams: mockedHook.mockReturnValue(new URLSearchParams()),
}));

describe('sidebar', () => {
  it('renders the correct number of sections', () => {
    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections).toHaveLength(TEST_SECTIONS.length);
  });

  it('renders a section with the correct name', () => {
    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections[0].querySelector('a')?.textContent).toBe(TEST_SECTIONS[0].label);
  });

  it('renders a section with the correct href', () => {
    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections[0].querySelector('a')).toHaveAttribute(
      'href',
      `${TEST_PATHNAME}?step=${TEST_SECTIONS[0].value}`,
    );
  });

  it('expects the selected section to have the active class applied', () => {
    mockedHook.mockReturnValue(new URLSearchParams({ step: TEST_SECTIONS[0].value }));

    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections[0].querySelector('a')).toHaveClass(ACTIVE_CLASS);
  });

  it('expects other sections (not the selected one) to not have the active class applied', () => {
    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections[1].querySelector('a')).not.toHaveClass(ACTIVE_CLASS);
    expect(sections[2].querySelector('a')).not.toHaveClass(ACTIVE_CLASS);
  });

  it('if no query params are present, the sidebar defaults to the first section', () => {
    mockedHook.mockReturnValue(new URLSearchParams());

    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections[0].querySelector('a')).toHaveClass(ACTIVE_CLASS);
  });

  it('if a section is disabled, the disabled styles should be applied', () => {
    const { container } = render(<Sidebar sections={TEST_SECTIONS} />);
    const sections = container.querySelectorAll('li');

    expect(sections[2].querySelector('a')).toHaveClass('opacity-50 pointer-events-none');
  });
});
