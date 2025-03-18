import { MdLocationOn } from 'react-icons/md';

import { LinkButton } from '@/components/button/component';
import { CardWrapper } from '@/containers/cards/card/wrapper';
import { Project } from '@/types/project';

export function MyProjectCard(project: Project) {
  return (
    <CardWrapper className="gap-6">
      <h3 className="text-2xl font-display line-clamp-3">{project.name}</h3>
      <div className="flex gap-1 items-end">
        <MdLocationOn className="h-6 w-6" />
        <span>{`${project.city ?? ''}${project.state ? `, ${project.state.name}` : ''}, ${
          project.country.name
        }`}</span>
      </div>

      <div className="border-t border-b border-grey-40/40 py-2">
        {/* @todo replace with real investments */}
        <span>Water • Soil Health • Land access</span>
      </div>

      <LinkButton
        theme="outline"
        className="inline-flex self-start font-semibold"
        href={`/auth/projects/${project.id}/edit`}
      >
        Edit details
      </LinkButton>
    </CardWrapper>
  );
}
