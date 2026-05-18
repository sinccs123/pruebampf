'use client';

import Lottie from 'lottie-react';
import { useCallback, useEffect, useState } from 'react';

type LeyIAButtonVisualState = 'idle' | 'hover-in' | 'hover-out';

const LEYIA_BUTTON_ASSETS = {
  idle: '/images/leyia-idle.png',
  hoverInLottie: '/images/leyia-hover-in.json',
  hoverOutLottie: '/images/leyia-hover-out.json',
  hoverOutFallbackVideo: '/images/leyia-hover-out.webm',
} as const;

// Aca le podes cambiar los tamaños del boton segun la medida
const BUTTON_SIZE_CLASSES = 
  'w-20 h-20 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-24 xl:h-24 2xl:w-30 2xl:h-30';

const ICON_SIZE_CLASSES =
  'h-20 w-20 md:h-20 md:w-20 lg:h-22 lg:w-22 xl:h-22 xl:w-22 2xl:h-25 2xl:w-25';

interface LeyIAChatNubaxProps {
  buttonClassName?: string;
  containerClassName?: string;
}

export default function LeyIAChatNubax({
  buttonClassName = '',
  containerClassName = ''
}: LeyIAChatNubaxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [buttonVisualState, setButtonVisualState] =
    useState<LeyIAButtonVisualState>('idle');
  const [hoverInAnimationData, setHoverInAnimationData] = useState<object | null>(null);
  const [hoverOutAnimationData, setHoverOutAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadHoverInLottie = async () => {
      try {
        const response = await fetch(LEYIA_BUTTON_ASSETS.hoverInLottie, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as object;
        setHoverInAnimationData(data);
      } catch {
        // If JSON is missing or fails to load, the component keeps using the idle state.
      }
    };

    const loadHoverOutLottie = async () => {
      try {
        const response = await fetch(LEYIA_BUTTON_ASSETS.hoverOutLottie, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as object;
        setHoverOutAnimationData(data);
      } catch {
        // If JSON is missing or fails to load, the component uses the webm fallback.
      }
    };

    void loadHoverInLottie();
    void loadHoverOutLottie();

    return () => controller.abort();
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev && !isIframeLoaded) {
        setIsIframeLoaded(true);
      }
      return !prev;
    });
  }, [isIframeLoaded]);

  const handleMouseEnter = useCallback(() => {
    setIsHoveringButton(true);
    setButtonVisualState(hoverInAnimationData ? 'hover-in' : 'idle');
  }, [hoverInAnimationData]);

  const handleMouseLeave = useCallback(() => {
    setIsHoveringButton(false);
    setButtonVisualState((prev) => (prev === 'idle' ? 'idle' : 'hover-out'));
  }, []);

  const handleButtonAnimationEnd = useCallback(() => {
    setButtonVisualState((prev) => {
      if (prev === 'hover-out') {
        return isHoveringButton ? 'hover-in' : 'idle';
      }

      return isHoveringButton ? prev : 'hover-out';
    });
  }, [isHoveringButton]);

  return (
    <>
      <video
        className='hidden'
        src={LEYIA_BUTTON_ASSETS.hoverOutFallbackVideo}
        preload='auto'
        muted
        playsInline
        aria-hidden='true'
      />

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className={`
          fixed bottom-5 right-5 ${BUTTON_SIZE_CLASSES}
          border-2 border-[#0BA7BE] overflow-hidden
          bg-primary hover:cursor-pointer
          rounded-full shadow-lg
          flex items-center justify-center
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-[#0BA7BE]/50
          z-50
          ${buttonClassName}
        `}
        aria-label={isOpen ? 'Cerrar agente' : 'Abrir agente'}
        type='button'
      >
        {buttonVisualState === 'idle' ? (
          <img
            src={LEYIA_BUTTON_ASSETS.idle}
            alt='Asistente Virtual LeyIA MPFCIUDAD'
            className={`pointer-events-none ${ICON_SIZE_CLASSES} pb-1 select-none object-contain`}
            draggable={false}
          />
        ) : buttonVisualState === 'hover-in' && hoverInAnimationData ? (
          <Lottie
            key='hover-in-lottie'
            animationData={hoverInAnimationData}
            autoplay
            loop={false}
            onComplete={handleButtonAnimationEnd}
            className={`pointer-events-none ${ICON_SIZE_CLASSES} pb-1 select-none object-contain`}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        ) : buttonVisualState === 'hover-out' && hoverOutAnimationData ? (
          <Lottie
            key='hover-out-lottie'
            animationData={hoverOutAnimationData}
            autoplay
            loop={false}
            onComplete={handleButtonAnimationEnd}
            className={`pointer-events-none ${ICON_SIZE_CLASSES} pb-1 select-none object-contain`}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        ) : buttonVisualState === 'hover-out' ? (
          <video
            key={buttonVisualState}
            src={LEYIA_BUTTON_ASSETS.hoverOutFallbackVideo}
            autoPlay
            muted
            playsInline
            preload='auto'
            onEnded={handleButtonAnimationEnd}
            className={`pointer-events-none ${ICON_SIZE_CLASSES} pb-1 select-none object-contain`}
          />
        ) : (
          <img
            src={LEYIA_BUTTON_ASSETS.idle}
            alt='Asistente Virtual LeyIA MPFCIUDAD'
            className={`pointer-events-none ${ICON_SIZE_CLASSES} pb-1 select-none object-contain`}
            draggable={false}
          />
        )}
      </button>

      {/* Chat Container */}
      <div
        className={`
          fixed bottom-28 right-5 w-96 h-[550px]
          bg-white rounded-2xl shadow-2xl
          overflow-hidden
          transition-all duration-300 ease-in-out
          z-40
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          ${containerClassName}
        `}
        role='dialog'
        aria-label='Ventana de chat'
        aria-hidden={!isOpen}
      >
        {isIframeLoaded && (
          <iframe
            src='https://pocfisc.nubax.ai/'
            title='Asistente Virtual LeyIA MPFCIUDAD'
            className='w-full h-full border-0'
          />
        )}
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/25 z-30 md:hidden'
          onClick={toggleChat}
          aria-hidden='true'
        />
      )}
    </>
  );
}
