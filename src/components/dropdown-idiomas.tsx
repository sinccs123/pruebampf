'use client';

import { Fragment, useState } from 'react';

import Image from 'next/image';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Popover, Transition } from '@headlessui/react';

import { Dictionary } from '@/lib/dictionary';
import { usePathname, useRouter } from 'next/navigation';

const languages = [
  {
    id: 'es',
    name: 'Español',
    image: 'es.png',
    imageAltText: 'Icono de bandera argentina',
  },
  {
    id: 'en',
    name: 'English',
    image: 'en.png',
    imageAltText: 'Icono de bandera inglesa',
  },
  {
    id: 'br',
    name: 'Português',
    image: 'br.png',
    imageAltText: 'Icono de bandera brasilera',
  },
];

export default function DropdownIdiomas() {
  const pathname = usePathname();
  const [currLang] = pathname.split('/').filter(Boolean);
  const [languageSelected, setLanguageSelected] = useState(currLang);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (languageId: string) => {
    setLanguageSelected(languageId);
    setIsOpen(false);
    const [_, ...rest] = pathname.split('/').filter(Boolean);
    router.replace(
      `/${languageId}${rest.length > 0 ? `/${rest.join('/')}` : ''}`
    );
  };

  return (
    <Popover className='relative'>
      {() => (
        <>
          <Popover.Button
            onClick={toggleMenu}
            className={`group inline-flex items-center rounded-md bg-white shadow-sm pl-3 pr-1 py-2 text-base font-medium border border-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 hover:shadow-md`}
          >
            <span className='text-xs flex flex-row items-center justify-center gap-1'>
              <Image
                src={`/images/${
                  languages.find((l) => l.id === languageSelected)?.image
                }`}
                alt={
                  languages.find((l) => l.id === languageSelected)
                    ?.imageAltText || languageSelected.toUpperCase()
                }
                width='20'
                height='20'
                className='mr-2'
              />
              {languageSelected.toUpperCase()}
            </span>
            <ChevronDownIcon
              className={`ml-2 h-5 w-5 transition-all duration-200 ease-in ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </Popover.Button>
          <Transition
            show={isOpen}
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute right-0 z-10 w-48 px-4 mt-1 transform sm:px-0 lg:max-w-3xl'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5'>
                <div className='relative flex flex-col px-4 py-2 bg-white'>
                  {languages.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => handleLanguageSelect(item.id)}
                      className={`flex flex-row items-center text-left py-3 ${
                        index > 0 ? 'border-t border-gray-200' : ''
                      }`}
                    >
                      <>
                        <Image
                          src={`/images/${item.image}`}
                          alt={item.imageAltText}
                          width='20'
                          height='20'
                          className='mr-2'
                        />
                        {item.name}
                      </>
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
