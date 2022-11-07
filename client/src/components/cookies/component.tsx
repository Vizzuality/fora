import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/button';

import type { CookiesProps } from './types';

export const Cookies: React.FC<CookiesProps> = ({ open, onAccept, onReject }: CookiesProps) => {
  return (
    <AnimatePresence>
      {open && (
        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: '100%',
            }}
            animate={{
              opacity: 1,
              y: '0%',
              transition: {
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              y: '100%',
              transition: {
                delay: 0,
              },
            }}
            className="fixed bottom-0 left-0 z-50 w-full p-6 overflow-hidden transform translate-y-full outline-none bg-grey-60"
          >
            <div className="flex flex-col space-y-5 lg:flex-row lg:justify-between lg:items-center lg:space-x-5 lg:space-y-0">
              <p className="text-base">
                This website uses cookies to ensure you get the best experience on our website. Read
                our{' '}
                <Link href="/privacy-policy">
                  <a className="font-semibold text-black underline">cookie policy</a>
                </Link>{' '}
                to know more.
              </p>
              <div className="flex justify-end gap-3">
                <Button theme="black-alt" size="base" onClick={onReject}>
                  Deny
                </Button>
                <Button theme="black" size="base" onClick={onAccept}>
                  Accept
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cookies;
