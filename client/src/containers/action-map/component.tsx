import React from 'react';

import Wrapper from 'containers/wrapper';

import Filters from './filters';
import Legend from './legend';
import List from './list';
import Map from './map';

const ActionMap = () => {
  return (
    <>
      <Filters />

      <Wrapper>
        <div className="grid grid-cols-12 py-10 gap-x-10">
          <div className="col-span-8">
            <div className="flex flex-col w-full space-y-5">
              <Map />

              <div className="flex items-center justify-between">{/* <View /> */}</div>
            </div>
          </div>
          <div className="col-span-3 col-start-10 max-h-[500px]">
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="flex flex-col h-full min-h-0 grow">
                <List />
              </div>
              <div className="shrink-0 grow">
                <Legend />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ActionMap;
