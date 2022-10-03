import React, { useCallback, useMemo, useState } from 'react';

import Image from 'next/image';

import { useAreas } from 'hooks/areas';

import AnimatedScroll from 'containers/home/animated-scroll';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';
import Carousel from 'components/carousel';
import Icon from 'components/icon';

import CHECK_SVG from 'svgs/ui/check.svg?sprite';
import CHEVRON_RIGHT from 'svgs/ui/chevron-right.svg?sprite';

const Invest = () => {
  const { data: areasData } = useAreas();
  const [slide, setSlide] = useState(0);

  const formatedAreasData = useMemo(() => {
    const perChunk = 6; // items per chunk

    const panels = areasData.reduce((all, one, i) => {
      const ch = Math.floor(i / perChunk);
      all[ch] = [].concat(all[ch] || [], one);
      return all;
    }, []);

    return panels.map((areas, i) => {
      return {
        id: `panel-${i}`,
        content: (
          <ul key={i} className="space-y-5">
            {areas.map((area) => (
              <li key={area.id} className="flex space-x-2.5 text-xl text-white">
                <div className="flex items-center justify-center w-5 h-5 mt-1 bg-white rounded-full shrink-0">
                  <Icon className="w-3 h-3 text-blue-0" icon={CHECK_SVG} />
                </div>
                <span>{area.name}</span>
              </li>
            ))}
          </ul>
        ),
      };
    });
  }, [areasData]);

  const handleOnNextClick = useCallback(() => {
    const length = formatedAreasData?.length;
    setSlide((prevState) => {
      if (prevState + 1 === length) {
        return 0;
      }
      return prevState + 1;
    });
  }, [formatedAreasData]);

  return (
    <section id="invest" className="pt-16 space-y-20">
      <Wrapper>
        <div className="relative grid grid-cols-12">
          <div className="col-span-9 col-start-4">
            <div className="p-16 space-y-8 bg-blue-0">
              <h3 className="relative z-10 text-3xl text-white font-display">
                What can you invest in?
              </h3>
              <div className="px-20 space-y-8">
                <p className="text-xl text-white">
                  Browse a catalogue of over 40 areas of focus that you can support and invest in
                  and find out what current members are interested in.
                </p>

                {!!formatedAreasData.length && (
                  <div className="flex">
                    <Carousel
                      slide={slide}
                      slides={formatedAreasData}
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
                    <button type="button" aria-label="arrow-right" onClick={handleOnNextClick}>
                      <Icon className="w-7 h-7 fill-white" icon={CHEVRON_RIGHT} />
                    </button>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button size="xl" theme="white-alt" href="/action-map">
                    Explore the Map
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-0 z-0 col-span-4">
            <AnimatedScroll
              className="w-full h-full"
              xOptions={{
                start: 0,
                end: 0,
              }}
              yOptions={{
                start: 300,
                end: 100,
              }}
            >
              <Image
                priority
                layout="fixed"
                // src="/images/what/what-2.png"
                src="/images/invest/invest-1.jpg"
                alt="Invest 1"
                width={408}
                height={370}
              />
            </AnimatedScroll>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Invest;
