import React from 'react';

import SimilarsItem from './similars-item';

export interface SimilarsSectionProps {
  type: 'funders' | 'projects';
}

const SimilarsSection = ({ type }: SimilarsSectionProps) => {
  return (
    <div className="space-y-9">
      <h3 className="text-2xl font-display"> {`What are the similar ${type}?`}</h3>

      <SimilarsItem type={type} />
    </div>
  );
};

export default SimilarsSection;
