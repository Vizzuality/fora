import { useEffect, useState } from 'react';

import { useAtom } from 'jotai/react';
import { PiWarningFill } from 'react-icons/pi';
import { useLocalstorageState } from 'rooks';

import { Button } from '@/components/button/component';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { formModalAtom } from '@/containers/auth/store';
import { cn } from '@/lib/utils';
import Modal from 'components/modal';

export default function FormModal() {
  const [api, setApi] = useState<CarouselApi>();
  const [localStorageShow, setLocalStorageShow] = useLocalstorageState<boolean>(
    'FORA__SHOW_FORM_MODAL',
    true,
  );
  const [isDisabled, setDisabled] = useState<boolean>(localStorageShow);
  const [showFormModal, setShowFormModal] = useAtom(formModalAtom);
  const [open, setOpen] = useState(localStorageShow);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (showFormModal) {
      setOpen(showFormModal);
    }
  }, [showFormModal]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Modal
      open={open}
      title="How to fill in your details?"
      size="default"
      onOpenChange={() => {
        if (showFormModal) {
          setOpen(false);
          setShowFormModal(false);
        }
      }}
    >
      <div className="flex flex-col justify-center gap-10 p-20">
        <h3 className="text-center font-display text-[40px] font-normal leading-none">
          How to fill in your details?
        </h3>
        <Carousel setApi={setApi}>
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem>
              <div className="grid h-full grid-cols-12 flex-col justify-center gap-5 bg-white">
                <h4 className="col-span-12 text-center font-display text-2xl">
                  1. Required fields
                </h4>
                <p className="col-span-8 col-start-3 text-center">
                  In order to be able to <span className="font-semibold">save changes</span> you
                  need to fill in all mandatory fields, from all sections, marked with a red
                  asterisk. Please, fill out all questions as thoroughly as possible - the higher
                  quality the data, the higher quality the output!
                </p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid grid-cols-12 justify-center gap-5 bg-white">
                <h4 className="col-span-12 text-center font-display text-2xl">2. Privacy</h4>
                <div className="col-span-8 col-start-3 flex flex-col gap-5 text-center">
                  <p>
                    Next to each question is the privacy level of the question marked by a different
                    symbol. The three options are:
                  </p>
                  <ul>
                    <li>
                      <span className="font-semibold">1. Public</span> (i.e. will be on the public
                      platform)
                    </li>
                    <li>
                      <span className="font-semibold">2. Private</span> (will only be shown on the
                      platform in the aggregate, not identifiable to a single funder)
                    </li>
                    <li>
                      <span className="font-semibold">3. Only FORA</span> (not on the platform, only
                      visible to FORA members)
                    </li>
                  </ul>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselNext
            onClick={() => {
              api.scrollNext();
              setDisabled(false);
            }}
          />
        </Carousel>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              api.scrollTo(0);
            }}
            className="focus-visible:outline-0"
          >
            <span
              className={cn('inline-block h-2 w-2 rounded-full bg-[#D9D9D9]', {
                'bg-green-0': current === 0,
              })}
            />
          </button>
          <button
            type="button"
            autoFocus={false}
            onClick={() => {
              api.scrollTo(1);
            }}
            className="focus-visible:outline-0"
          >
            <span
              className={cn('inline-block h-2 w-2 rounded-full bg-[#D9D9D9]', {
                'bg-green-0': current === 1,
              })}
            />
          </button>
        </div>

        <div className="flex flex-col gap-5 rounded-lg border border-[#FEE92E] bg-[#FEFBDF] py-5 px-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <PiWarningFill className="h-6 w-6 text-red-0" />
            <h5 className="font-display text-2xl">Important</h5>
          </div>
          <p>
            If you close or navigate away from this page, any information you have entered and not
            saved will be lost.
          </p>
        </div>
        <Button
          theme="green"
          className="self-center"
          disabled={isDisabled}
          onClick={() => {
            if (!showFormModal) setLocalStorageShow(false);
            setOpen(false);
            setShowFormModal(false);
          }}
        >
          I understand
        </Button>
      </div>
    </Modal>
  );
}
