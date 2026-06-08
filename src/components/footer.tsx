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
  style: { height: 26, width: 26, margin: 0 },
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
    <>
      <footer className='bg-primary px-6 py-10 text-white sm:hidden'>
        <div className='flex flex-col items-center gap-8 text-center'>
          <div className='max-w-52'>
            <Image
              src='../images/logo_mpf_blanco.svg'
              alt='Logo del Ministerio Público Fiscal'
              width='290'
              height='90'
            />
          </div>

          <div>
            <p className='mb-2 font-bold text-secondary'>ACCESOS RÁPIDOS</p>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index} className='py-0.5'>
                  <Link href={menuItem.href} className='text-base'>
                    {menuItem.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='mb-2 font-bold text-secondary'>NUESTROS CANALES</p>
            <div className='mt-1 flex flex-nowrap justify-center gap-3'>
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

          <div className='flex flex-col gap-1'>
            <Link href='mailto:denuncias@fiscalías.gob.ar'>denuncias@fiscalías.gob.ar</Link>
            <Link href={`tel:080033347225`}>0800 33 347225</Link>
          </div>
        </div>
      </footer>

      <footer className='hidden bg-primary px-10 py-10 text-white sm:block lg:hidden'>
        <div className='grid grid-cols-[minmax(220px,1fr)_minmax(220px,1fr)] gap-x-8 gap-y-6 md:mx-auto md:w-fit md:grid-cols-[max-content_max-content] md:gap-x-36'>
          <div>
            <div className='max-w-56'>
              <Image
                src='../images/logo_mpf_blanco.svg'
                alt='Logo del Ministerio Público Fiscal'
                width='290'
                height='90'
              />
            </div>
            <div className='mt-4 flex flex-col gap-1'>
              <Link href='mailto:denuncias@fiscalías.gob.ar'>
                denuncias@fiscalías.gob.ar
              </Link>
              <Link href={`tel:080033347225`}>0800 33 347225</Link>
            </div>
          </div>

          <div>
            <p className='mb-2 font-bold text-secondary'>ACCESOS RÁPIDOS</p>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index} className='py-0.5'>
                  <Link href={menuItem.href} className='text-base'>
                    {menuItem.text}
                  </Link>
                </li>
              ))}
            </ul>

            <div className='mt-5'>
              <p className='mb-2 font-bold text-secondary'>NUESTROS CANALES</p>
              <div className='mt-1 flex flex-nowrap gap-3'>
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
          </div>
        </div>
      </footer>

      <footer className='footer-desktop-row hidden bg-primary text-white lg:flex lg:items-start lg:justify-between lg:px-24 lg:py-12 xl:p-16 xl:px-40'>
        <div className='footer-desktop-links-col lg:order-2 lg:min-w-60'>
          <p className='mb-2 font-bold text-secondary'>ACCESOS RÁPIDOS</p>
          <ul>
            {menuItems.map((menuItem, index) => (
              <li key={index} className='py-0.5'>
                <Link href={menuItem.href} className='text-base'>
                  {menuItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='footer-desktop-logo-col lg:order-1'>
          <div className='flex w-full flex-col'>
            <div className='max-w-56 xl:max-w-68'>
              <Image
                src='../images/logo_mpf_blanco.svg'
                alt='Logo del Ministerio Público Fiscal'
                width='290'
                height='90'
              />
            </div>
          </div>
        </div>

        <div className='footer-desktop-channels-col lg:order-3 lg:min-w-65'>
          <div className='flex w-full flex-col'>
            <p className='mb-2 font-bold text-secondary'>NUESTROS CANALES</p>
            <div className='mt-1 flex flex-nowrap justify-start gap-3 lg:mb-2'>
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

          <div className='flex flex-col gap-1 lg:mt-5 lg:flex'>
            <Link href='mailto:denuncias@fiscalías.gob.ar'>
              denuncias@fiscalías.gob.ar
            </Link>
            <Link href={`tel:080033347225`}>0800 33 347225</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
