import { createElement, useCallback, useMemo } from 'react';

import cx from 'classnames';

import { Widget } from 'types/widget';

import { useModal } from 'hooks/modals';

import Icon from 'components/icon';
import Modal from 'components/modal';

import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import INFO_SVG from 'svgs/ui/info.svg?sprite';

import { HorizontalBarChart, PieChart } from './types';

const CHART_TYPES = {
  pie: PieChart,
  'horizontal-bar': HorizontalBarChart,
};

const WidgetDiagram = (widget: Widget) => {
  const { title, description, config } = widget;
  const { type, className } = config;

  const { isOpen: isOpenModal, open: openModal, close: closeModal } = useModal();

  const CHART = useMemo(() => {
    return createElement(CHART_TYPES[type], {
      ...widget,
    });
  }, [widget, type]);

  const handleClickInfo = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleClickDownload = useCallback(() => {
    console.info('Download');
  }, []);

  return (
    <div
      className={cx({
        'py-8 px-6 space-y-5 h-full': true,
        [className]: !!className,
      })}
    >
      <header className="flex items-start justify-between space-x-10">
        <h3 className="text-2xl font-display">{title}</h3>

        <div className="flex border divide-x rounded-lg shrink-0 border-grey-40 divide-grey-40">
          <button
            type="button"
            className="p-3 shrink-0 hover:bg-green-0/25"
            onClick={handleClickInfo}
          >
            <div className="flex items-center justify-center w-6 h-6 border rounded-full border-grey-0">
              <Icon icon={INFO_SVG} className="block w-5 h-5" />
            </div>
          </button>
          <button
            type="button"
            className="p-3 shrink-0 hover:bg-green-0/25"
            onClick={handleClickDownload}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <Icon icon={DOWNLOAD_SVG} className="block w-5 h-5" />
            </div>
          </button>
        </div>
      </header>

      <Modal title={title} open={isOpenModal} onOpenChange={() => closeModal()}>
        <div className="p-6">
          <h3 className="text-2xl font-display">{title}</h3>
          <p className="mt-2 text-grey-100">{description}</p>
        </div>
      </Modal>

      {CHART}
    </div>
  );
};

export default WidgetDiagram;
