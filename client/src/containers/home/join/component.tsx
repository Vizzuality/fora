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
          className="flex flex-col items-center justify-center py-24 space-y-10 bg-cover"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/join/join-2.jpg)`,
            backgroundPosition: bgPosition,
          }}
        >
          <h2 className="max-w-3xl mx-auto text-4xl text-center text-white font-display">
            Support regenerative agriculture initiatives
          </h2>

          <Button size="xl" theme="white" className="px-20">
            Join FORA
          </Button>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Join;
