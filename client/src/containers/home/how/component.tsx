import React from 'react';

import cx from 'classnames';

import Image from 'next/image';

import AnimatedScroll from 'containers/home/animated-scroll';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const How = () => {
  return (
    <section id="hero" className="relative z-10 pt-16">
      <Wrapper>
        <div className="space-y-10">
          <h2 className="text-4xl text-center font-display">How it works?</h2>

          <div className="space-y-32">
            {/* DASHBOARD */}
            <div className="grid grid-cols-12 gap-5">
              <div className="relative col-span-5">
                <AnimatedScroll
                  className="flex items-center justify-between w-full h-full p-16 mt-16 space-y-10 bg-green-0/10"
                  xOptions={{
                    start: 0,
                    end: 0,
                  }}
                  yOptions={{
                    start: 0,
                    end: -64,
                  }}
                >
                  <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/how/dashboard@2x.png`}
                    alt="Dashboard"
                    width={1281}
                    height={1260}
                  />
                </AnimatedScroll>
              </div>

              <div className="relative col-span-7">
                <AnimatedScroll
                  className="flex flex-col justify-between h-full p-16 space-y-10 bg-green-0/10"
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
                    <h3 className="text-2xl font-display text-grey-0">Dashboard</h3>
                    <p className="text-xl">
                      The dashboard provides summary graphs and charts (including aggregations of
                      collective data, exploring changes and shifts over time, highlighting
                      disparities and gaps, providing percentages in regards to focus areas or other
                      filters etc)
                    </p>
                    <p className="text-xl">
                      You can filter the dashboards according to various parameters, including:
                    </p>
                    <ul className="text-xl list-disc list-inside">
                      <li>
                        <div className="inline-flex items-center space-x-3 font-semibold">
                          <label>Geographic scope</label>
                          <Tooltip
                            arrowProps={{
                              enabled: true,
                              size: 6,
                              className: 'bg-grey-60',
                            }}
                            content={
                              <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                                <span>
                                  The country, region or state a project or funder focuses on
                                  working or investing in.
                                </span>
                              </div>
                            }
                          >
                            <div className="w-5 h-5 bg-black rounded-full">
                              <Icon
                                icon={INFO_SVG}
                                className={cx({
                                  'w-5 h-5 text-white': true,
                                })}
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center space-x-3 font-semibold">
                          <label>Area of focus</label>
                          <Tooltip
                            arrowProps={{
                              enabled: true,
                              size: 6,
                              className: 'bg-grey-60',
                            }}
                            content={
                              <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                                <span>
                                  A regenerative agriculture related topic a project or funder
                                  focuses on working or investing in.
                                </span>
                              </div>
                            }
                          >
                            <div className="w-5 h-5 bg-black rounded-full">
                              <Icon
                                icon={INFO_SVG}
                                className={cx({
                                  'w-5 h-5 text-white': true,
                                })}
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center space-x-3 font-semibold">
                          <label>Demographic scope</label>
                          <Tooltip
                            arrowProps={{
                              enabled: true,
                              size: 6,
                              className: 'bg-grey-60',
                            }}
                            content={
                              <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                                <span>
                                  Different demographic groups a project or funder focuses on
                                  working or investing in.
                                </span>
                              </div>
                            }
                          >
                            <div className="w-5 h-5 bg-black rounded-full">
                              <Icon
                                icon={INFO_SVG}
                                className={cx({
                                  'w-5 h-5 text-white': true,
                                })}
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex space-x-5">
                    <Button size="xl" theme="black-alt" href="/dashboards">
                      Go to Dashboard
                    </Button>
                  </div>
                </AnimatedScroll>
              </div>
            </div>

            {/* MAP */}
            <div className="grid grid-cols-12 gap-5">
              <div className="relative col-span-7">
                <AnimatedScroll
                  className="flex flex-col justify-between h-full p-16 space-y-10 bg-green-0/10"
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
                    <h3 className="text-2xl font-display text-grey-0">Action map</h3>
                    <p className="text-xl">
                      The Action Map allows you to view and interact with various areas of interest
                      across geographies, exploring where your colleagues are funding and better
                      visualize the collective work of FORA members
                    </p>
                    <p className="text-xl">
                      All data can be filtered through various filters, including:
                    </p>
                    <ul className="text-xl list-disc list-inside">
                      <li>
                        <div className="inline-flex items-center space-x-3 font-semibold">
                          <label>Geographic scope</label>
                          <Tooltip
                            arrowProps={{
                              enabled: true,
                              size: 6,
                              className: 'bg-grey-60',
                            }}
                            content={
                              <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                                <span>
                                  The country, region or state a project or funder focuses on
                                  working or investing in.
                                </span>
                              </div>
                            }
                          >
                            <div className="w-5 h-5 bg-black rounded-full">
                              <Icon
                                icon={INFO_SVG}
                                className={cx({
                                  'w-5 h-5 text-white': true,
                                })}
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center space-x-3 font-semibold">
                          <label>Area of focus</label>
                          <Tooltip
                            arrowProps={{
                              enabled: true,
                              size: 6,
                              className: 'bg-grey-60',
                            }}
                            content={
                              <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                                <span>
                                  A regenerative agriculture related topic a project or funder
                                  focuses on working or investing in.
                                </span>
                              </div>
                            }
                          >
                            <div className="w-5 h-5 bg-black rounded-full">
                              <Icon
                                icon={INFO_SVG}
                                className={cx({
                                  'w-5 h-5 text-white': true,
                                })}
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center space-x-3 font-semibold">
                          <label>Demographic scope</label>
                          <Tooltip
                            arrowProps={{
                              enabled: true,
                              size: 6,
                              className: 'bg-grey-60',
                            }}
                            content={
                              <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                                <span>
                                  Different demographic groups a project or funder focuses on
                                  working or investing in.
                                </span>
                              </div>
                            }
                          >
                            <div className="w-5 h-5 bg-black rounded-full">
                              <Icon
                                icon={INFO_SVG}
                                className={cx({
                                  'w-5 h-5 text-white': true,
                                })}
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex space-x-5">
                    <Button size="xl" theme="black-alt" href="/action-map">
                      Go to Map
                    </Button>
                  </div>
                </AnimatedScroll>
              </div>

              <div className="relative col-span-5">
                <AnimatedScroll
                  className="flex items-center justify-between h-full p-5 mt-16 space-y-10 bg-green-0/10"
                  xOptions={{
                    start: 0,
                    end: 0,
                  }}
                  yOptions={{
                    start: 0,
                    end: -64,
                  }}
                >
                  <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/how/map@2x.png`}
                    alt="Dashboard"
                    width={1563}
                    height={1047}
                  />
                </AnimatedScroll>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default How;
