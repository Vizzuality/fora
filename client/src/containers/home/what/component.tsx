import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import AnimatedScroll from 'containers/home/animated-scroll';
import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';

import { PRINCIPLES } from './constants';

const What = () => {
  return (
    <section id="what" className="space-y-20">
      <Wrapper>
        <div className="grid grid-cols-12">
          <div className="relative col-span-11 col-start-2">
            <div className="p-16 space-y-8 bg-green-0">
              <h2 className="max-w-xl text-4xl font-display text-grey-0">
                What is regenerative agriculture?
              </h2>
              <p className="px-20 text-xl text-grey-0">
                Regenerative Agriculture is the process of restoring and regenerating the social,
                cultural and ecological contexts unique to each piece of land. Rooted in centuries
                old indigenous and traditional practices and knowledge, Regenerative Agriculture
                honors the interplay between human and non-human relationships to bring an entire
                ecosystem into health and abundance. In practical implementation terms on the land,
                regeneration is often guided by the following principles:
              </p>
            </div>

            <AnimatedScroll
              className="absolute z-0 w-full h-full bg-green-0/10 top-full -left-1/2"
              xOptions={{ start: 150, end: 150 }}
              yOptions={{ start: -250, end: 0 }}
            />
          </div>
        </div>
      </Wrapper>

      <Wrapper>
        <div className="relative z-10 grid grid-cols-3 gap-10">
          {PRINCIPLES.map(({ title, icon, description }, i) => (
            <motion.div
              key={title}
              className=""
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: (i % 3) * 0.1,
                },
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
            >
              <div className="flex space-x-5">
                <Icon icon={icon} className="w-6 h-6 text-green-0 shrink-0" />

                <div className="space-y-2.5">
                  <h3 className="text-2xl font-display text-grey-0">{title}</h3>
                  <p className="text-xl text-grey-0">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Wrapper>

      <Wrapper>
        <div className="grid grid-cols-12 gap-10">
          <div className="relative col-span-6 col-start-2">
            <div className="space-y-8">
              <h3 className="text-3xl font-display text-grey-0">
                What does regenerative agriculture foster?
              </h3>
              <p className="pl-20 text-xl text-grey-0">
                When realized, regenerative agriculture fosters a set of interconnected benefits,
                offering us a shovel ready solution to multiple challenges, including climate
                change, water scarcity and cleanliness, food insecurity, floods and fires, economic
                and social inequality, food sovereignty, ecological systems collapse, biodiversity
                loss, soil health decline, nutrient density and quality collapse, and chemical and
                toxics reduction.
              </p>
            </div>
          </div>
          <div className="relative col-span-5 col-start-8">
            <div className="flex space-x-5">
              <AnimatedScroll
                className="w-full mt-20"
                xOptions={{ start: 0, end: 0 }}
                yOptions={{ start: -25, end: 25 }}
              >
                <Image
                  priority
                  src="/images/what/what-1.png"
                  alt="What 1"
                  width={238}
                  height={356}
                />
              </AnimatedScroll>
              <AnimatedScroll
                className="w-full mt-10"
                xOptions={{ start: 0, end: 0 }}
                yOptions={{ start: 25, end: -100 }}
              >
                <Image
                  priority
                  src="/images/what/what-2.png"
                  alt="What 2"
                  width={238}
                  height={356}
                />
              </AnimatedScroll>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default What;
