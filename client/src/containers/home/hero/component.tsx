import React from 'react';

import Image from 'next/image';

import AnimatedScrollComponent from 'containers/home/animated-scroll';
import Wrapper from 'containers/wrapper';

const Hero = () => {
  return (
    <section id="hero" className="relative z-10 py-32">
      <Wrapper>
        <div className="space-y-10">
          <h2 className="text-6xl text-center font-display">What is FORA?</h2>
          <div className="grid grid-cols-12">
            <div className="relative col-span-7 col-start-6">
              <p className="text-xl">
                FORA (Funders for Regenerative Agriculture) is a network of funders and funder
                initiatives aimed at informing, educating, organizing, providing collaborative
                opportunities, and recruiting new members in support of regenerative agricultural
                systems. By working together, we hope to foster a robust, connected, equitable and
                resilient movement aimed at accelerating the adoption of regenerative agriculture
                principles across land, animals, people, as well as our social, cultural, and
                economic systems.
              </p>

              <AnimatedScrollComponent
                className="absolute left-0 -translate-x-1/2 translate-y-20 top-full"
                xOptions={{ start: -200, end: -150 }}
                yOptions={{ start: 80, end: 80 }}
                cacaoOptions={{ start: 0, end: 1 }}
              >
                <Image
                  priority
                  layout="fixed"
                  src="/images/hero/hero-2.png"
                  alt="Hero 2"
                  width={406}
                  height={337}
                />
              </AnimatedScrollComponent>

              <AnimatedScrollComponent
                className="absolute -translate-x-10 right-full top-28"
                xOptions={{ start: -40, end: -40 }}
                yOptions={{ start: 112, end: 0 }}
              >
                <Image
                  priority
                  layout="fixed"
                  src="/images/hero/hero-1.png"
                  alt="Hero 1"
                  width={389}
                  height={248}
                />
              </AnimatedScrollComponent>

              <AnimatedScrollComponent
                className="absolute left-0 translate-x-20 translate-y-10 top-full"
                xOptions={{ start: 80, end: 200 }}
                yOptions={{ start: 75, end: -100 }}
              >
                <Image
                  priority
                  layout="fixed"
                  src="/images/hero/hero-3.png"
                  alt="Hero 3"
                  width={389}
                  height={597}
                />
              </AnimatedScrollComponent>
            </div>
          </div>
          <div className="h-[250px]" />
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
