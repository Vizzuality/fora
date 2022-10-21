import React from 'react';

import AreasSimilars from './areas-similars';
import DemographicSimilars from './demographic-similars';
import GeographicSimilars from './geographic-similars';

export interface SimilarsSectionProps {
  type: 'funders' | 'projects';
}

const SimilarsSection = ({ type }: SimilarsSectionProps) => {
  return (
    <div className="space-y-9">
      <h3 className="text-2xl font-display"> {`What are the similar ${type}?`}</h3>

      <GeographicSimilars type={type} />
      {type === 'funders' && <AreasSimilars type={type} />}
      <DemographicSimilars type={type} />
    </div>
  );
};

export default SimilarsSection;
