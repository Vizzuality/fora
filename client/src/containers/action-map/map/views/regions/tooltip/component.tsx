export interface RegionsTooltipProps {
  properties: Record<string, any>;
}

const RegionsTooltip = ({ properties = {} }: RegionsTooltipProps) => {
  const { name, count } = properties ?? {};

  return (
    <ul className="space-y-5">
      <li className="font-semibold">
        <h4 className="text-sm uppercase text-grey-40">Location</h4>
        <p className="text-base">{name}</p>
      </li>
      <li className="font-semibold">
        <h4 className="text-sm uppercase text-grey-40">Funders</h4>
        <p className="text-base">{count}</p>
      </li>
    </ul>
  );
};

export default RegionsTooltip;
