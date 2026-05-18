'use client';

import { Fragment } from 'react';

import { useRouter } from 'next/navigation';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Report } from '@/components/que-denunciar';
import { Dictionary } from '@/lib/dictionary';

export interface QueDenunciarModalProps {
  opened: boolean;
  report: Report;
  onClose: () => void;
  dictionary: Dictionary;
}

export default function QueDenunciarModal({
  opened,
  report,
  onClose,
  dictionary,
}: QueDenunciarModalProps) {
  const { denunciaAhora } = dictionary;

  const router = useRouter();

  const handleReportNow = (type: string) => {
    onClose();
    router.push(`/denuncia/ahora?from=${type}`);
  };

  return (
    <Transition appear show={report !== null && opened} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/65' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-end md:items-center justify-center min-h-full text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='translate-y-full md:translate-y-0 lg:opacity-0 lg:scale-95'
              enterTo='translate-y-0 lg:opacity-100 lg:scale-100'
              leave='ease-in duration-200'
              leaveFrom='translate-y-0 lg:opacity-100 lg:scale-100'
              leaveTo='translate-y-full md:translate-y-0 lg:opacity-0 lg:scale-95'
            >
              <Dialog.Panel className='fixed bottom-0 w-full max-w-2xl max-h-[95vh] p-6 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-t-lg md:rounded-xl md:p-10 md:absolute md:bottom-auto'>
                <div className='relative h-full'>
                  <button
                    onClick={() => onClose()}
                    className='absolute -top-3 -right-3 md:-top-8 md:-right-8 '
                  >
                    <XMarkIcon className='w-8 h-8' />
                  </button>
                  <div className='flex flex-col max-h-[85vh] md:max-h-[80vh]'>
                    <Dialog.Title className='text-lg pb-4 font-bold px-6 leading-6 text-gray-600 2xl:text-2xl'>
                      {report?.title}
                    </Dialog.Title>
                    <div className='overflow-auto grow'>
                      <div
                        className='text-left text-gray-500 md:my-4 2xl:text-xl'
                        dangerouslySetInnerHTML={{
                          __html: report?.description,
                        }}
                      />

                      <p className='font-bold text-left text-secondary pt-4'>
                        {report?.arts}
                      </p>
                    </div>
                    <div className='mt-6 md:mt-8'>
                      <button
                        onClick={() => handleReportNow(report?.key)}
                        className='px-8 py-2 m-auto text-lg font-bold border rounded-lg shadow-md lg:text-lg 2xl:text-2xl lg:py-3 2xl:py-4 lg:px-8 2xl:px-8 border-primary text-primary hover:bg-secondary/30'
                      >
                        {denunciaAhora?.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
