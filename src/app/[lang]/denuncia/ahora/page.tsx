import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/lib/i18n';

import Header from '@/components/header';
import Footer from '@/components/footer';

import FormDenunciaClient from '@/app/[lang]/denuncia/ahora/page-client';
import { mpfapi } from '@/lib/mpfapi';
import { Toaster } from 'react-hot-toast';
import FormDenunciaNewClient from './page-client';

type FormDenunciaProps = {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FormDenuncia({
  params,
  searchParams,
}: FormDenunciaProps) {
  const { lang } = await params;
  const { from } = await searchParams;

  const dictionary = await getDictionary(lang);
  const nacionalidades = await mpfapi.nacionalidades();
  const nacionalidadesForm = nacionalidades.map((nac) => ({
    value: nac.code,
    label: nac.value,
  }));
  const { queQueresDenunciar } = dictionary;

  return (
    <>
      <Toaster position='bottom-right' />
      <Header dictionary={dictionary} />
      <div className='bg-white w-full min-h-full pb-8'>
        <h2 className='relative mt-4 text-xl text-center md:text-3xl sectionTitle md:mb-20 pt-8 md:pt-16 2xl:pt-32'>
          {queQueresDenunciar?.title}
        </h2>
        <div className='px-8'>
          <FormDenunciaNewClient
            dictionary={dictionary}
            nacionalidades={nacionalidadesForm}
            motivoSelected={from as string}
          />
        </div>
      </div>
      <Footer dictionary={dictionary} />
    </>
  );
}
