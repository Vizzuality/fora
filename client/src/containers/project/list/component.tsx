import React, { useCallback, useMemo, useState } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { useProjectsInfinity } from 'hooks/projects';

import Card from 'containers/cards/card';

import Carousel from 'components/carousel';
import Icon from 'components/icon';

import CHEVRON_RIGHT_SVG from 'svgs/ui/chevron-right.svg?sprite';

const ProjectList = () => {
  const { data: projectsData } = useProjectsInfinity();
  const [slide, setSlide] = useState(0);

  const formatProjectsData = useMemo(() => {
    return projectsData.map((project, i) => {
      return {
        id: `project-${i}`,
        content: (
          <div className="mr-4">
            <Card key={project.id} {...project} />
          </div>
        ),
      };
    });
  }, [projectsData]);

  const handleOnNextClick = useCallback(() => {
    const length = formatProjectsData?.length;
    setSlide((prevState) => {
      if (prevState + 1 === length) {
        return 0;
      }
      return prevState + 1;
    });
  }, [formatProjectsData]);

  return (
    <div className="space-y-20">
      <div className="space-y-9">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display"> What projects is funding?</h3>
          <div>
            <Link href="/projects">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all projects</span>
                <Icon
                  icon={CHEVRON_RIGHT_SVG}
                  className={cx({
                    'w-2 h-2 text-grey-0': true,
                  })}
                />
              </a>
            </Link>
          </div>
        </div>

        {!!formatProjectsData.length && (
          <div className="relative flex">
            <Carousel
              slide={slide}
              slides={formatProjectsData}
              options={{
                circular: true,
                align: 'prev',
                panelsPerView: 2,
              }}
              onChanged={(e) => {
                setSlide(() => {
                  return e.index;
                });
              }}
            />

            <div className="absolute top-0 right-0 z-10 h-full w-96 md:bg-gradient-to-l md:from-white" />

            <button
              type="button"
              aria-label="arrow-right"
              className="absolute top-0 right-0 z-10 h-full"
              onClick={handleOnNextClick}
            >
              <Icon className="w-5 h-8" icon={CHEVRON_RIGHT_SVG} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-9">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display"> What are the similar funders?</h3>
          <div>
            <Link href="/funders">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all funders</span>
                <Icon
                  icon={CHEVRON_RIGHT_SVG}
                  className={cx({
                    'w-2 h-2 text-grey-0': true,
                  })}
                />
              </a>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Geographic Scope</div>

          {!!formatProjectsData.length && (
            <div className="relative flex">
              <Carousel
                slide={slide}
                slides={formatProjectsData}
                options={{
                  circular: true,
                  align: 'prev',
                  panelsPerView: 2,
                }}
                onChanged={(e) => {
                  setSlide(() => {
                    return e.index;
                  });
                }}
              />

              <div className="absolute top-0 right-0 z-10 h-full w-96 md:bg-gradient-to-l md:from-white" />

              <button
                type="button"
                aria-label="arrow-right"
                className="absolute top-0 right-0 z-10 h-full"
                onClick={handleOnNextClick}
              >
                <Icon className="w-5 h-8" icon={CHEVRON_RIGHT_SVG} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Area of Focus</div>

          {!!formatProjectsData.length && (
            <div className="relative flex">
              <Carousel
                slide={slide}
                slides={formatProjectsData}
                options={{
                  circular: true,
                  align: 'prev',
                  panelsPerView: 2,
                }}
                onChanged={(e) => {
                  setSlide(() => {
                    return e.index;
                  });
                }}
              />

              <div className="absolute top-0 right-0 z-10 h-full w-96 md:bg-gradient-to-l md:from-white" />

              <button
                type="button"
                aria-label="arrow-right"
                className="absolute top-0 right-0 z-10 h-full"
                onClick={handleOnNextClick}
              >
                <Icon className="w-5 h-8" icon={CHEVRON_RIGHT_SVG} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
