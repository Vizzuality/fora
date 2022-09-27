import React from 'react';

import { useRouter } from 'next/router';

import Card from './card';
import { CardProps } from './card';

export interface CardsProps {
  data: CardProps[];
}

const Cards = ({ data }: CardsProps) => {
  const { pathname } = useRouter();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card key={item.id} href={`${pathname}/${item.id}`} {...item} />
      ))}
    </div>
  );
};

export default Cards;
