import { useCallback } from 'react';

import { usePlausible } from 'next-plausible';

import { useModal } from 'hooks/modals';
import { useWidgetDownload } from 'hooks/widgets';

import { Widget } from '@/types/api/widget';
import Icon from 'components/icon';
import Loading from 'components/loading';
import Modal from 'components/modal';

import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import INFO_SVG from 'svgs/ui/info.svg?sprite';

export interface WidgetToolbarProps extends Widget {
  toolbar: {
    info?: boolean;
    download?: boolean;
  };
}

const WidgetToolbar = ({ title, description, slug, params, toolbar }: WidgetToolbarProps) => {
  const { info, download } = toolbar;

  const { isOpen: isOpenModal, open: openModal, close: closeModal } = useModal();

  const { mutate: mutateDownload, isPending: isDownloadLoading } = useWidgetDownload();

  const plausible = usePlausible();

  const handleClickInfo = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleClickDownload = useCallback(() => {
    mutateDownload({ slug, params });

    plausible('Dashboard - Download report', {
      props: {
        reportName: slug,
      },
    });
  }, [mutateDownload, slug, params, plausible]);

  return (
    <>
      <div className="flex shrink-0 divide-x divide-grey-40 overflow-hidden rounded-lg border border-grey-40">
        {info && (
          <button
            type="button"
            className="shrink-0 p-3 transition-colors hover:bg-grey-40"
            onClick={handleClickInfo}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-grey-0">
              <Icon icon={INFO_SVG} className="block h-5 w-5" />
            </div>
          </button>
        )}

        {download && (
          <button
            type="button"
            className="shrink-0 p-3 transition-colors hover:bg-grey-40"
            onClick={handleClickDownload}
          >
            <div className="relative flex h-6 w-6 items-center justify-center">
              <Loading visible={isDownloadLoading} />
              <Icon icon={DOWNLOAD_SVG} className="block h-5 w-5" />
            </div>
          </button>
        )}
      </div>

      <Modal size="s" title={title} open={isOpenModal} onOpenChange={() => closeModal()}>
        <div className="space-y-5 p-20">
          <h3 className="font-display text-2xl">{title}</h3>
          <p className="text-grey-100 mt-2 text-lg">{description}</p>
        </div>
      </Modal>
    </>
  );
};

export default WidgetToolbar;
