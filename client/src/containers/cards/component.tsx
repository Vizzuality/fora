import React from 'react';

import Link from 'next/link';

import { Funder } from 'types/funder';
import { Project } from 'types/project';

import Icon from 'components/icon';

import ADD_ICON_SVG from 'svgs/icons/add.svg?sprite';

import Card from './card';
import ProjectCard from './project-card';

export interface CardsProps {
  data: (Funder | Project)[] | Partial<Funder>[] | Partial<Project>[];
  theme?: 'green' | 'grey' | 'bg-green-0';
  pathname: string;
  project?: boolean;
}

const Cards = ({ data = [], theme = 'grey', pathname, project = false }: CardsProps) => {
  const hasProjects = project && data.length > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {project && (
        <div
          className={
            'flex flex-col items-center justify-center p-8 bg-green-80 text-[24px] text-center space-x-2'
          }
        >
          <p className="font-[200] leading-[30px]">
            Add new <br /> Project
          </p>
          <div className="mt-5">
            <Link href="/my-projects/new">
              <Icon icon={ADD_ICON_SVG} className="w-10 h-10 font-medium" />
            </Link>
          </div>
        </div>
      )}

      {data.map((item) =>
        hasProjects ? (
          <ProjectCard theme="green" key={item.id} href={`${pathname}/${item.id}/edit`} {...item} />
        ) : (
          <Card theme={theme} key={item.id} href={`${pathname}/${item.id}`} {...item} />
        )
      )}
    </div>
  );
};

export default Cards;
