import React from 'react';

const AreaScopeHeader: React.FC = () => {
  return (
    <header className="px-10">
      <h2 className="text-2xl font-normal font-display whitespace-nowrap text-grey-0">
        Filter the data by <span className="font-semibold">Area of Focus</span>
      </h2>
    </header>
  );
};

export default AreaScopeHeader;
