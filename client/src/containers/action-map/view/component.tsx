import { setView, View } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import Tabs from 'components/tabs';

const VIEWS = [
  {
    name: 'Regions',
    id: 'regions',
  },
  {
    name: 'States',
    id: 'states',
  },
];

const MapView = () => {
  const { view, filters } = useAppSelector((state) => state['/action-map']);
  const { geographic } = filters;
  const dispatch = useAppDispatch();

  return (
    <div className="w-full">
      {geographic === 'regions' && (
        <Tabs
          theme="grey"
          selected={view}
          items={VIEWS}
          onChange={(v) => {
            dispatch(setView(v as View));
          }}
        />
      )}
    </div>
  );
};

export default MapView;
