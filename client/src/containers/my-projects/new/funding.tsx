import LinkButton from 'components/button';

export default function FundingStep() {
  return (
    <div className="grid-cols-12 grid justify-center items-center">
      <div className="col-span-6 flex flex-col text-center gap-4 col-start-4 items-center">
        <h3 className="font-display text-2.5xl">You have no funding reported for this project.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur. Convallis fusce neque odio nunc elementum habitant
          sit sagittis.
        </p>
        <LinkButton href="/my-fundings?project=${projectId}" theme="green">
          Report Funding
        </LinkButton>
      </div>
    </div>
  );
}
