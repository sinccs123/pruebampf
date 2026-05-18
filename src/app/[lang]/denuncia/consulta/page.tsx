import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/lib/i18n';

import Header from '@/components/header';
import Footer from '@/components/footer';

import { Toaster } from 'react-hot-toast';
import DenunciaConsultaPageClient from './page-client';

type StatusPageProps = {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ id?: number }>;
};

export default async function DenunciaConsultaPage({
  params,
  searchParams,
}: StatusPageProps) {
  const { lang } = await params;
  const { id } = await searchParams;
  const dictionary = await getDictionary(lang);
  const { consultaDenuncia } = dictionary;

  return (
    <>
      <Toaster position='bottom-right' />
      <Header dictionary={dictionary} />
      <div className='bg-white w-full min-h-full pb-8'>
        <h2 className='relative mt-2 text-xl text-center md:text-3xl sectionTitle md:mb-12 pt-8 md:pt-16 2xl:pt-32'>
          {consultaDenuncia?.title}
        </h2>
        <div className='px-8'>
          <DenunciaConsultaPageClient dictionary={dictionary} id={id} />
        </div>
      </div>
      <Footer dictionary={dictionary} />
    </>
  );
}
