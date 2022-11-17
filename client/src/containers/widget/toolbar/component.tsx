import { useCallback } from 'react';

import { Widget } from 'types/widget';

import { useModal } from 'hooks/modals';
import { useWidgetDownload } from 'hooks/widgets';

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

  const { mutate: mutateDownload, isLoading: isDownloadLoading } = useWidgetDownload();

  const handleClickInfo = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleClickDownload = useCallback(() => {
    mutateDownload({ slug, params });
  }, [slug, params, mutateDownload]);

  return (
    <>
      <div className="flex border divide-x rounded-lg shrink-0 border-grey-40 divide-grey-40">
        {info && (
          <button
            type="button"
            className="p-3 shrink-0 hover:bg-green-0/25"
            onClick={handleClickInfo}
          >
            <div className="flex items-center justify-center w-6 h-6 border rounded-full border-grey-0">
              <Icon icon={INFO_SVG} className="block w-5 h-5" />
            </div>
          </button>
        )}

        {download && (
          <button
            type="button"
            className="p-3 shrink-0 hover:bg-green-0/25"
            onClick={handleClickDownload}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <Loading visible={isDownloadLoading} />
              <Icon icon={DOWNLOAD_SVG} className="block w-5 h-5" />
            </div>
          </button>
        )}
      </div>

      <Modal title={title} open={isOpenModal} onOpenChange={() => closeModal()}>
        <div className="p-6">
          <h3 className="text-2xl font-display">{title}</h3>
          <p className="mt-2 text-grey-100">{description}</p>
        </div>
      </Modal>
    </>
  );
};

export default WidgetToolbar;
