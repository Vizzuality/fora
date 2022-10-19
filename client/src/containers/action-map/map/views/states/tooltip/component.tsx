import { useAppSelector } from 'store/hooks';

export interface StatesTooltipProps {
  properties: Record<string, any>;
}

const StatesTooltip = ({ properties = {} }: StatesTooltipProps) => {
  const { type } = useAppSelector((state) => state['/action-map']);

  const { name, region_name: rName, count } = properties ?? {};

  return (
    <ul className="space-y-5">
      <li className="font-semibold">
        <h4 className="text-sm uppercase text-grey-40">Location</h4>
        <p className="text-base max-w-[170px]">{name}</p>
      </li>
      <li className="font-semibold">
        <h4 className="text-sm uppercase text-grey-40">Region</h4>
        <p className="text-base">{rName}</p>
      </li>
      <li className="font-semibold">
        <h4 className="text-sm uppercase text-grey-40">{type}</h4>
        <p className="text-base">{count}</p>
      </li>
    </ul>
  );
};

export default StatesTooltip;
