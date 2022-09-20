import React from 'react';

import AnimatedScroll from 'containers/home/animated-scroll';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';

const Why = () => {
  return (
    <section id="hero" className="relative z-10">
      <Wrapper>
        <div className="space-y-10">
          <h2 className="text-4xl text-center font-display">Why use the platform?</h2>
          <div className="grid grid-cols-12 gap-5">
            <div className="relative col-span-6">
              <AnimatedScroll
                className="flex flex-col justify-between h-full p-16 space-y-10 bg-blue-0/10 rounded-2xl"
                xOptions={{
                  start: 0,
                  end: 0,
                }}
                yOptions={{
                  start: 0,
                  end: 64,
                }}
              >
                <div className="space-y-5">
                  <h3 className="text-2xl font-display text-grey-0">As a funder</h3>
                  <p className="text-xl">
                    FORA’s members represent a diverse range of funders, investors, and partners
                    that are all deploying a variety of capital across varying issue and focus
                    areas, strategies, and geographic scopes. The platform will serve to aggregate
                    and visualize all of this work in one place, so that we may better inform our
                    collaborative efforts and understand both the gaps in our collective work and
                    the opportunities.
                  </p>
                </div>
                <div className="flex space-x-5">
                  <Button size="xl" theme="blue-alt" href="/funders">
                    View all funders
                  </Button>

                  <Button size="xl" theme="blue" href="/funders">
                    Join FORA
                  </Button>
                </div>
              </AnimatedScroll>
            </div>

            <div className="relative col-span-6">
              <AnimatedScroll
                className="flex flex-col justify-between h-full p-16 mt-16 space-y-10 bg-blue-0/10 rounded-2xl"
                xOptions={{
                  start: 0,
                  end: 0,
                }}
                yOptions={{
                  start: 0,
                  end: -64,
                }}
              >
                <div className="space-y-5">
                  <h3 className="text-2xl font-display text-grey-0">As A Practitioner</h3>
                  <p className="text-xl">
                    The platform will keep you up-to-date on the what, who, and where of the funding
                    and strategies of FORA members. As practitioners and partners in the field, we
                    hope the platform offers greater transparency and opportunities for synergistic
                    collaboration in support of your work.
                  </p>
                </div>
                <div className="flex space-x-5">
                  <Button size="xl" theme="blue-alt" href="/projects">
                    View all projects
                  </Button>
                </div>
              </AnimatedScroll>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Why;
