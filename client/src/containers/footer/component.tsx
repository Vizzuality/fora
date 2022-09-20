import React from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';
import { NAV, POLICIES } from 'constants/nav';

import LOGO_MONOCHROME_SVG from 'svgs/logo-monochrome.svg';
import LINKEDIN_SVG from 'svgs/social/linkedin.svg?sprite';
import TWITTER_SVG from 'svgs/social/twitter.svg?sprite';

const Footer = () => {
  return (
    <footer>
      <div className="py-14 bg-blue-0/5">
        <Wrapper>
          <div className="flex flex-col justify-between space-y-10 md:space-y-0 md:flex-row">
            <div className="flex flex-col items-center justify-between space-y-10 md:items-start md:space-y-0 md:flex-row md:space-x-20">
              <Link href="/">
                <a>
                  <Image
                    src={LOGO_MONOCHROME_SVG}
                    alt="Logo"
                    layout="fixed"
                    width={122}
                    height={56}
                    priority
                  />
                </a>
              </Link>

              <nav className="flex">
                <ul className="gap-10 space-y-3 text-center md:text-left md:columns-2">
                  {NAV.map((item) => {
                    const { href, label, target, rel } = item;

                    return (
                      <li key={href}>
                        {target === '_blank' && (
                          <a
                            href={href}
                            target={target}
                            rel={rel}
                            className="py-2 text-base font-semibold hover:opacity-75"
                          >
                            {label}
                          </a>
                        )}

                        {!target && (
                          <Link href={href}>
                            <a className="py-2 text-base font-semibold hover:opacity-75">{label}</a>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex flex-col space-y-2.5 items-center">
              <h3 className="text-sm font-bold text-grey-0">Follow us on:</h3>
              <ul className="flex items-center space-x-2.5">
                <li>
                  <a
                    href="https://www.linkedin.com/company/funders-for-regenerative-agriculture/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={LINKEDIN_SVG} className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/FORAFunders"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={TWITTER_SVG} className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Wrapper>
      </div>

      <div className="w-full py-5 text-sm text-white bg-blue-0">
        <Wrapper>
          <div className="flex flex-col items-center justify-between space-y-5 md:space-y-0 md:flex-row">
            <div className="text-center">© Funders for Regenerative Agriculture 2022</div>
            <ul className="flex flex-col items-center divide-y md:divide-y-0 md:divide-x md:flex-row divide-white/20">
              {POLICIES.map(({ href, label }, i) => (
                <li
                  key={href}
                  className={cx({
                    'py-2 md:py-0': true,
                    'md:pl-5': i !== 0,
                    'md:pr-5': i !== POLICIES.length - 1,
                  })}
                >
                  <Link href={href}>
                    <a className="hover:underline">{label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
};

export default Footer;
