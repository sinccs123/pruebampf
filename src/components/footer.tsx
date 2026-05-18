'use client';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Dictionary } from '@/lib/dictionary';

type FooterProps = {
  dictionary: Dictionary;
};

const iconsProps = {
  bgColor: '#ffffff',
  fgColor: '#014A50',
  style: { height: 26, width: 26, margin: 6 },
};

export default function Footer({ dictionary }: FooterProps) {
  const { menu } = dictionary;
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const menuItems = [
    { href: `/${locale}#reportNow`, text: menu?.reportNow },
    { href: `/${locale}#howReport`, text: menu?.howReport },
    { href: `/${locale}#whatReport`, text: menu?.whatReport },
    { href: `/${locale}#whereReport`, text: menu?.whereReport },
  ];

  return (
    <footer className='flex flex-col p-8 text-white md:p-16 2xl:p-32 md:flex-row bg-primary'>
      <div className='md:order-2 md:ml-20'>
        <p className='mb-2 font-bold'>Accesos rápidos</p>
        <ul className=''>
          {menuItems.map((menuItem, index) => (
            <li key={index} className='py-0.5'>
              <Link href={menuItem.href} className='text-base'>
                {menuItem.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-row items-center justify-between mt-12 md:flex-col md:mt-0 md:order-1 md:justify-normal md:items-start'>
        <div className='flex w-full gap-4 flex-col'>
          <div className='max-w-44'>
            <Image
              src='../images/logo_mpf_blanco.svg'
              alt='Logo del Ministerio Público Fiscal'
              width='290'
              height='90'
            />
          </div>
          <div className='flex justify-start flex-grow -mr-3 md:mr-0 md:mb-4 flex-nowrap'>
            <SocialIcon
              network='facebook'
              url='https://www.facebook.com/mpfcaba'
              title='Facebook'
              {...iconsProps}
            />
            <SocialIcon
              network='x'
              url='https://x.com/MPFCABA'
              title='Twitter'
              {...iconsProps}
            />
            <SocialIcon
              network='instagram'
              url='https://www.instagram.com/mpfcaba'
              title='Instagram'
              {...iconsProps}
            />
            <SocialIcon
              network='tiktok'
              url='https://www.tiktok.com/@mpfcaba'
              title='TikTok'
              {...iconsProps}
            />
          </div>
        </div>
        <Link
          href='mailto:denuncias@fiscalías.gob.ar'
          className='hidden mb-2 md:flex'
        >
          denuncias@fiscalías.gob.ar
        </Link>
        <Link href={`tel:080033347225`} className='hidden md:flex'>
          0800 33 347225
        </Link>
      </div>
    </footer>
  );
}
