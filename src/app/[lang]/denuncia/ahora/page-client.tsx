'use client';

import { useActionState, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import toast from 'react-hot-toast';

import {
  ClipboardIcon,
  HomeIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

import {
  enviarDenunciaAction,
  EnviarDenunciaActionState,
} from '@/actions/enviar-denuncia';

import { Dictionary } from '@/lib/dictionary';

import useUploadFiles from '@/hooks/use-upload-files';

import DenuncianteSection from '@/app/[lang]/denuncia/ahora/sections/denunciante';
import HechoSection from '@/app/[lang]/denuncia/ahora/sections/hecho';
import DenunciadoSection from '@/app/[lang]/denuncia/ahora/sections/denunciado';

import SectionTitle from '@/components/form/section-title';
import UploadFiles from '@/components/form/upload-files';
import Recaptcha from '@/components/recaptcha';
import { CONFIG } from '@/lib/config';

interface FormDenunciaNewClientProps {
  dictionary: Dictionary;
  nacionalidades: any[];
  motivoSelected?: string;
}

const IconCalendar = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
    />
  </svg>
);

export default function FormDenunciaNewClient({
  dictionary,
  nacionalidades,
  motivoSelected = '',
}: FormDenunciaNewClientProps) {
  const formDenunciaRef = useRef<HTMLFormElement>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [ip, setIp] = useState<string>('');

  const { setFiles } = useUploadFiles({
    accept: 'image/*, audio/*, video/*',
    maxFiles: 3,
  });
  const [state, formAction, isPending] =
    // @ts-expect-error
    useActionState<EnviarDenunciaActionState>(enviarDenunciaAction, {
      dictionary,
    });

  const { labels, menu } = dictionary;
  const { toast: toastLabels, sectionTitles } = labels;

  const handleCopyDenunciaId = (ev: React.MouseEvent<HTMLSpanElement>) => {
    ev.preventDefault();
    if (state?.data?.data[0]?.denuncia_id) {
      formDenunciaRef.current?.reset();
      setFiles([]);
      setRecaptchaToken('');
      navigator.clipboard.writeText(state.data.data[0].denuncia_id);
      toast.success(toastLabels.copySuccess, { position: 'bottom-center' });
    }
  };

  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch(CONFIG.IFCONFIGME_URL);
      const ipText = await response.text();
      setIp(ipText);
    };
    fetchIp();
  }, []);

  return (
    <form ref={formDenunciaRef} action={formAction}>
      <input type='hidden' name='ip' value={ip} />
      <HechoSection
        dictionary={dictionary}
        IconCalendar={IconCalendar}
        motivoSelected={motivoSelected}
      />
      <DenuncianteSection
        dictionary={dictionary}
        nacionalidades={nacionalidades}
        iconCalendar={IconCalendar}
      />
      <DenunciadoSection
        dictionary={dictionary}
        nacionalidades={nacionalidades}
        iconCalendar={IconCalendar}
      />
      <div className='max-w-screen-sm mr-auto ml-auto'>
        <SectionTitle text={sectionTitles.adjuntos} />
        <UploadFiles name='uploadFiles' />
        <input type='hidden' name='recaptchaToken' value={recaptchaToken} />
        <div className='flex items-center justify-center'>
          <Recaptcha
            changeCallback={(captchaCode: string | null) => {
              if (captchaCode) setRecaptchaToken(captchaCode);
            }}
          />
        </div>
        <button
          type='submit'
          disabled={isPending || !recaptchaToken || state?.success}
          className={`text-white p-4 bg-primary rounded-lg w-full my-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
            isPending ? 'animate-pulse' : ''
          }${state?.success ? 'hidden' : ''}`}
        >
          {isPending ? labels.finishing : labels.finish}
        </button>
        {state?.success && (
          <div
            className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4'
            role='alert'
          >
            <p className='font-bold'>
              {toastLabels.denuncia.envioOkDescripcion}
            </p>
            <span
              onClick={handleCopyDenunciaId}
              className='font-bold cursor-pointer flex items-center justify-center1 ml-1'
            >
              # {state?.data?.data[0]?.denuncia_id}
              <ClipboardIcon className='h-5 w-5' />
            </span>
            <div className='flex items-center justify-start gap-2 mt-2'>
              <Link
                href={
                  '/denuncia/consulta?id=' + state?.data?.data[0]?.denuncia_id
                }
                className='bg-green-900 text-white px-4 py-2 rounded-md'
              >
                <div className='flex items-center gap-1'>
                  <InformationCircleIcon className='h-5 w-5' />
                  {menu.checkStatus}
                </div>
              </Link>
              <Link
                href='/'
                className='bg-gray-500 text-white px-4 py-2 rounded-md'
              >
                <div className='flex items-center gap-1'>
                  <HomeIcon className='h-5 w-5' />
                  {menu.home}
                </div>
              </Link>
            </div>
          </div>
        )}
        {state?.error && (
          <div
            className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
            role='alert'
          >
            <p className='font-bold'>Error</p>
            <p>{toastLabels.denuncia.envioError}</p>
          </div>
        )}
      </div>
    </form>
  );
}
