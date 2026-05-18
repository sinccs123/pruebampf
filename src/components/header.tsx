'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Dictionary } from '@/lib/dictionary';

import DropdownIdiomas from '@/components/dropdown-idiomas';
import useIsMobileMenu from '@/hooks/use-is-mobile-menu';

type HeaderProps = {
  dictionary: Dictionary;
};

export default function Header({ dictionary }: HeaderProps) {
  const [navbar, setNavbar] = useState(false);
  const { isMobileMenu } = useIsMobileMenu();
  const { menu } = dictionary;

  const menuItems = [
    { href: '/denuncia/ahora', text: menu?.reportNow },
    { href: '/#howReport', text: menu?.howReport },
    { href: '/#whatReport', text: menu?.whatReport },
    { href: '/#whereReport', text: menu?.whereReport },
    { href: '/denuncia/consulta', text: menu?.checkStatus },
    {
      href: 'https://orientacion.mpfciudad.gob.ar',
      text: menu?.orientation,
      newTab: true,
    },
  ];

  const toggleNavbar = () => {
    if (!isMobileMenu) return;
    setNavbar(!navbar);
    if (!navbar) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  return (
    <nav className='sticky top-0 z-[7] bg-white flex flex-row items-center shadow-lg py-2 2xl:py-3 px-3 md:px-4 lg:px-4 xl:px-8 2xl:px-20 gap-2 md:gap-3 xl:gap-4 2xl:gap-6'>
      <Link
        href='/'
        className='my-3 shrink-0 max-w-44 md:max-w-48 lg:max-w-44 xl:max-w-52 2xl:max-w-64'
      >
        <Image
          src='/images/logo_mpf.svg'
          alt='Logo del Ministerio Público Fiscal'
          width='290'
          height='90'
        />
      </Link>

      <div
        className={`relative z-50 ${
          navbar ? 'block' : 'hidden'
        } lg:min-w-0 lg:grow lg:flex lg:justify-end`}
      >
        <div className='fixed inset-0 bg-black opacity-80 lg:hidden'></div>

        <div className='fixed top-0 bottom-0 right-0 flex flex-col w-5/6 px-8 py-6 bg-white max-w-96 lg:static lg:flex-row lg:bottom-auto lg:right-auto lg:p-0 lg:w-full lg:grow lg:justify-end lg:max-w-none'>
          <div className='flex items-center justify-end mb-8 lg:hidden'>
            <button onClick={toggleNavbar}>
              <XMarkIcon className='w-8 h-8 -mr-2' />
            </button>
          </div>

          <div className='header-menu-row lg:flex lg:w-full lg:flex-nowrap lg:items-stretch lg:justify-end lg:gap-1 xl:gap-2 2xl:gap-3'>
            {menuItems.map((menuItem, index) => (
              <Link
                key={index}
                href={menuItem.href}
                target={menuItem.newTab ? '_blank' : undefined}
                rel={menuItem.newTab ? 'noopener noreferrer' : undefined}
                onClick={(e) => toggleNavbar()}
                className='header-menu-link
                flex font-medium content-center justify-center py-5 border-b border-primary 
                lg:border-b-0 lg:px-0.5 lg:py-2 text-sm lg:text-sm 2xl:text-base lg:text-center lg:leading-tight lg:max-w-[118px] lg:whitespace-normal lg:break-words xl:max-w-none xl:whitespace-nowrap
                lg:relative lg:flex lg:min-h-[48px] lg:w-fit lg:items-center lg:justify-center 
                lg:after:block after:content-[""] lg:after:absolute lg:after:h-[2px] lg:after:bg-primary lg:after:w-4/6
                lg:after:scale-x-0 lg:after:bottom-0 lg:after:origin-center lg:after:opacity-0 lg:after:transition lg:after:duration-300 
                lg:after:left-1/2 lg:transform lg:after:-translate-x-1/2
                lg:after:hover:scale-x-100 lg:after:hover:opacity-100'
              >
                {menuItem.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='ml-auto flex flex-row shrink-0 gap-2 md:gap-3'>
        <DropdownIdiomas />
        <button onClick={toggleNavbar} className='text-primary-600 lg:hidden'>
          <Bars3BottomRightIcon className='w-8 h-8' />
        </button>
      </div>
    </nav>
  );
}
