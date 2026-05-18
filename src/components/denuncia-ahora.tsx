'use client';

import { useState, useEffect } from 'react';
import useIsMobile from '@/hooks/use-is-mobile';

import { Dictionary } from '@/lib/dictionary';
import DenunciaAhoraButton from './denuncia-ahora-button';

type DenunciaAhoraProps = {
  dictionary: Dictionary;
};

export default function DenunciaAhora({ dictionary }: DenunciaAhoraProps) {
  const { denunciaAhora } = dictionary;
  const { isMobile } = useIsMobile();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 388;
      setIsSticky(offset > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <>
        <div className={`p-8 bg-primary text-center`} id='reportNow'>
          <h1 className='text-2xl font-normal text-white'>
            {denunciaAhora?.text}
          </h1>
          <p className='mt-4 text-2xl text-secondary'>
            {denunciaAhora?.subtext}
          </p>
        </div>
        <div
          className={`bg-white text-center p-4 sticky top-[79px] transition-all duration-300 ease-in z-[1] ${
            isSticky ? 'shadow-lg py-2' : 'py-8'
          }`}
        >
          <DenunciaAhoraButton
            buttonText={denunciaAhora?.buttonText}
            isSticky={isSticky}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`denunciaAhora p-8 md:px-16 md:py-12 2xl:px-32 2xl:pt-16 2xl:pb-20 relative ${
            isSticky &&
            'denunciaAhoraSticky sticky md:top-[-170px] lg:top-[-182px] 2xl:top-[-284px] border-b-8 border-b-primary z-[1]'
          }`}
          id='reportNow'
        >
          <div className='text-center md:text-left md:max-w-[370px] lg:max-w-[460px] 2xl:max-w-[460px]'>
            <h1 className='text-2xl font-normal text-white md:text-2xl lg:text-3xl 2xl:text-6xl 2xl:leading-[4.4rem] 2xl:tracking-[-1px] 2xl:pb-3'>
              {denunciaAhora?.text}
            </h1>
            <p className='mt-4 text-2xl text-secondary md:text-2xl lg:text-3xl 2xl:text-5xl md:my-8 2xl:mt-3'>
              {denunciaAhora?.subtext}
            </p>
            {!isSticky && (
              <DenunciaAhoraButton
                buttonText={denunciaAhora?.buttonText}
                isSticky={isSticky}
              />
            )}
          </div>
        </div>
        {isSticky && (
          <DenunciaAhoraButton
            buttonText={denunciaAhora?.buttonText}
            isSticky={isSticky}
          />
        )}
      </>
    );
  }
}
