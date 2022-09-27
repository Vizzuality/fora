import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
export interface CardProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  href?: string;
  areas?: {
    id: string;
    name: string;
  }[];
}

const Cards = ({
  name,
  description,
  href = '',
  image = '/images/avatar.png',
  areas = [
    {
      id: '1',
      name: 'Area 1',
    },
    {
      id: '2',
      name: 'Area 2',
    },
    {
      id: '3',
      name: 'Area 3',
    },
  ],
}: CardProps) => {
  return (
    <div className="flex flex-col justify-between p-8 space-y-10 bg-grey-60 text-grey-0">
      <div className="space-y-5">
        <div className="relative max-w-[50px]">
          <Image src={image} alt={name} layout="responsive" width={50} height={50} />
        </div>
        <h3 className="text-2xl font-display line-clamp-2">{name}</h3>
        <p className="line-clamp-3">{description}</p>
      </div>

      <div className="border-t divide-y divide-grey-40/50 border-grey-40/50">
        <div className="py-4">{areas.map((a) => a.name).join(' • ')}</div>

        <div className="pt-4">
          <Link href={href}>
            <a className="font-semibold underline">Go to project page</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
