import React from 'react';

import Card from './card';
import { CardProps } from './card';

export interface CardsProps {
  data: CardProps[];
  theme?: 'green' | 'grey';
  pathname: string;
}

const Cards = ({ data = [], theme = 'grey', pathname }: CardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card theme={theme} key={item.id} href={`${pathname}/${item.id}`} {...item} />
      ))}
    </div>
  );
};

export default Cards;
