import { Project } from '@/types/api/project';
import LinkButton from 'components/button';

export default function InvestmentsNotFound({ id }: { id: Project['id'] }) {
  return (
    <div className="grid grid-cols-12 items-center justify-center">
      <div className="col-span-6 col-start-4 flex flex-col items-center gap-4 text-center">
        <h3 className="font-display text-2.5xl">
          You have no investments reported for this project.
        </h3>
        {/*@todo: update text*/}
        <p>
          Lorem ipsum dolor sit amet consectetur. Convallis fusce neque odio nunc elementum habitant
          sit sagittis.
        </p>
        <LinkButton href={`/auth/investments/new?project=${id}`} theme="green">
          Report Investment
        </LinkButton>
      </div>
    </div>
  );
}
