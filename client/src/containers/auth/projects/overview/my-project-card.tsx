import { MdLocationOn } from 'react-icons/md';

import { LinkButton } from '@/components/button/component';
import { CardWrapper } from '@/containers/cards/card/wrapper';
import { Project } from '@/types/api/project';

export function MyProjectCard(project: Project) {
  return (
    <CardWrapper className="gap-6">
      <h3 className="font-display text-2xl line-clamp-3">{project.name}</h3>
      <div className="flex items-end gap-1">
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
