'use client';

import { useState, useCallback } from 'react';

interface ChatbotWidgetProps {
  /**
   * URL of the chatbot iframe
   */
  chatbotUrl?: string;
  /**
   * URL or path to the robot icon image
   */
  robotIconUrl?: string;
  /**
   * Custom styles for the button (optional)
   */
  buttonClassName?: string;
  /**
   * Custom styles for the container (optional)
   */
  containerClassName?: string;
}

export default function ChatbotWidget({
  chatbotUrl = 'https://pocfisc.nubax.ai/',
  robotIconUrl = '/images/leyIA_Icon_00.png',
  buttonClassName = '',
  containerClassName = ''
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev && !isIframeLoaded) {
        setIsIframeLoaded(true);
      }
      return !prev;
    });
  }, [isIframeLoaded]);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`
          fixed bottom-5 right-5 w-20 h-20
          bg-secondary hover:bg-primary/70 hover:cursor-pointer
          rounded-full shadow-lg
          flex items-center justify-center
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-primary/90
          z-50
          ${buttonClassName}
        `}
        aria-label={isOpen ? 'Cerrar agente' : 'Abrir agente'}
        type='button'
      >
        <img
          src={robotIconUrl}
          alt='Asistente Virtual LeyIA MPFCIUDAD'
          className='w-20 h-20 pointer-events-none select-none'
          draggable={false}
        />
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
            src={chatbotUrl}
            title='Asistente Virtual LeyIA MPFCIUDAD'
            className='w-full h-full border-0'
            allow='microphone; camera'
            sandbox='allow-same-origin allow-scripts allow-forms allow-popups'
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
