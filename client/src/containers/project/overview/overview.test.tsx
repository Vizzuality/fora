import { render, renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import ProjectOverview from './component';

import { useProject } from '@/hooks/projects';
import { AppWrapper } from '@/tests/utils';

const mocks = vi.hoisted(() => {
  return {
    mockedUseProject: vi.fn().mockReturnValue({
      data: {
        type: 'project',
        id: 'da31228c-e175-47e4-ab42-2e1b9a044ec8',
        name: 'project-test',
        description: 'test',
        website: 'http://website.com',
        leadership_demographics: null,
        leadership_demographics_other: null,
        areas: [],
        demographics: [],
        demographics_other: '',
        capital_types: [],
        capital_type_other: '',
        recipient_legal_status: 'for_profit',
        city: 'Arizona city',
        updated_at: '2025-03-20T11:56:32.335Z',
        created_at: '2025-03-19T15:56:21.118Z',
        logo: {
          small: 'https://my-path-for-assets/img/cat.png',
          medium: 'https://my-path-for-assets/img/cat.png',
          original: 'https://my-path-for-assets/img/cat.png',
        },
        state: {
          type: 'subgeographic',
          id: '8fa00b61-c4bf-43e4-9db6-a9fe4c60cb7e',
        },
        country: {
          type: 'subgeographic',
          id: '0a3eb410-481b-4a67-a8ae-e6b5de1a65e8',
        },
        subgeographics: [],
        subgeographic_ancestors: [],
        funders: [],
        investments: [],
        relationshipNames: [
          'state',
          'country',
          'subgeographics',
          'subgeographic_ancestors',
          'funders',
          'investments',
        ],
      },
      isFetching: false,
      isFetched: true,
    }),
  };
});

vi.mock('hooks/projects', () => {
  return {
    useProject: mocks.mockedUseProject,
  };
});

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      id: 'da31228c-e175-47e4-ab42-2e1b9a044ec8',
    },
  }),
}));

describe('project overview', () => {
  it('if a project has a logo, it will be rendered.', () => {
    const { container } = render(
      <AppWrapper>
        <ProjectOverview />
      </AppWrapper>,
    );

    const { result } = renderHook(() => useProject('da31228c-e175-47e4-ab42-2e1b9a044ec8'));

    const projectLogo = container.querySelector(`img[alt="${result.current.data.name} logo"]`);
    expect(projectLogo).toBeInTheDocument();
  });

  it('if a project has a website, it will be rendered.', () => {
    const { container } = render(
      <AppWrapper>
        <ProjectOverview />
      </AppWrapper>,
    );

    const { result } = renderHook(() => useProject('da31228c-e175-47e4-ab42-2e1b9a044ec8'));

    const websiteLink = container.querySelector(`a[href="${result.current.data.website}"]`);
    expect(websiteLink).toBeInTheDocument();
  });
});
