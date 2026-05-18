'use client';
import useIsMobile from '@/hooks/use-is-mobile';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useField } from 'formik';
import { Fragment, useEffect, useState } from 'react';

type Option = {
  value: string;
  label?: string;
  aditionalInfo?: string | null;
};

type OptionDondeDenunciar = Option & {
  value: string;
  label?: string;
  aditionalInfo?: string;
  tipo?: string;
  direccion?: string | null;
  altura?: number | null;
  telefono?: string | null;
  horario?: string;
  lat?: number;
  long?: number;
};

type CustomDropdownProps = {
  options: Option[] | OptionDondeDenunciar[];
  placeholder?: string;
  isrequired?: boolean;
  disabled?: boolean;
  error?: string;
  name: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  [x: string]: any;
};

export default function Dropdown({
  options,
  placeholder = 'Seleccione',
  isrequired = false,
  disabled = false,
  error,
  name,
  icon,
  defaultValue = '',
  setFieldValue,
  ...props
}: CustomDropdownProps) {
  const { isMobile } = useIsMobile();
  const [isOpen, setIsOpen] = useState(disabled);
  const [showCloseModal, setShowCloseModal] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<string>(() => {
    if (options.map((option) => option.value).includes(defaultValue)) {
      return defaultValue;
    }
    return '';
  });
  const [field, meta] = useField(name);

  useEffect(() => {
    const handleResize = () => setShowCloseModal(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.classList.add('overflow-hidden');
      return () => document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen, isMobile]);

  const handleChange = (value: string) => {
    setOptionSelected(value);
    setFieldValue?.(name, value);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Listbox value={optionSelected} onChange={handleChange}>
      <div className='w-full lg:relative my-5' id={name}>
        <Listbox.Button
          onClick={closeModal}
          className={`input 
            ${meta.error || error ? 'inputError' : ''} ${
            !meta.error && !error && field?.value?.length > 0 ? 'inputOk' : ''
          }
            ${props.className}`}
        >
          {isrequired && (
            <span className='absolute right-2 top-2 text-red-500 text-xl'>
              *
            </span>
          )}
          <span className='block truncate text-left'>
            {options
              .find((op) => op.value === optionSelected)
              ?.label?.toUpperCase() || placeholder}
          </span>
          <span
            className='absolute inset-y-0 right-4 flex items-center pointer-events-none'
            onClick={closeModal}
          >
            {icon || (
              <ChevronDownIcon
                className={`h-5 w-5 transition-all duration-200 ease-in ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            )}
          </span>
        </Listbox.Button>

        {!disabled && (
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className='fixed lg:absolute bg-black p-8 bg-opacity-80 top-0 left-0 right-0 bottom-0 z-[7] flex items-center  lg:z-[4] lg:bg-transparent lg:p-0  lg:top-auto lg:bottom-auto'
              onClick={closeModal}
            >
              <div className='flex flex-col p-4 text-base bg-white rounded-md shadow-lg w-full max-h-full lg:mt-1'>
                {showCloseModal && (
                  <div className='flex justify-end lg:hidden'>
                    <Listbox.Button onClick={closeModal}>
                      <XMarkIcon className={`h-8 w-8 mb-4`} />
                    </Listbox.Button>
                  </div>
                )}
                <div className='overflow-auto flex-grow lg:max-h-80'>
                  {options.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      value={option.value}
                      className={({ active }) =>
                        `min-h-[3rem] flex flex-col justify-center relative cursor-default select-none px-2 py-1 border-t-[1px] border-primary  ${
                          active ? 'bg-slate-100' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <div>
                          <span
                            className={`block truncate uppercase ${
                              selected ? 'font-bold' : 'font-normal'
                            }`}
                          >
                            {option.label ?? option.value}
                          </span>
                          <span className={'block truncate text-slate-500'}>
                            {option.aditionalInfo}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </div>
              </div>
            </Listbox.Options>
          </Transition>
        )}

        <p className='error'>{error}</p>
      </div>
    </Listbox>
  );
}
