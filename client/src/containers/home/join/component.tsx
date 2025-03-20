import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import Wrapper from 'containers/wrapper';

import Button from 'components/button';

const Join = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgPosition = useTransform(scrollYProgress, [0, 1], [`50% 70%`, `50% 30%`]);

  return (
    <section>
      <Wrapper>
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-10 bg-cover py-24"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/join/join-2.jpg)`,
            backgroundPosition: bgPosition,
          }}
        >
          <h2 className="mx-auto max-w-3xl text-center font-display text-4xl text-white">
            Support regenerative agriculture initiatives
          </h2>

          <Button
            size="xl"
            theme="white"
            className="px-20"
            href="https://forainitiative.org/contact/"
            target="_blank"
          >
            Join FORA
          </Button>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Join;
