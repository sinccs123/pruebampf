import { getDictionary } from '@/lib/dictionary';
import { type Locale } from '@/lib/i18n';
import { CONFIG } from '@/lib/config';

import ComoDenunciar from '@/components/como-denunciar';
import DenunciaAhora from '@/components/denuncia-ahora';
import DondeDenunciar from '@/components/donde-denunciar';
import Footer from '@/components/footer';
import Header from '@/components/header';
import QueDenunciar from '@/components/que-denunciar';

import LeyIAChatNubax from '@/components/leyia-chat-nubax';

type HomeProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header dictionary={dictionary} />
      <div>
        <DenunciaAhora dictionary={dictionary} />
        <ComoDenunciar dictionary={dictionary} />
        <QueDenunciar dictionary={dictionary} />
        <DondeDenunciar
          dictionary={dictionary}
          apiKey={CONFIG.GOOGLE_MAP_SECRET_KEY}
        />
      </div>
      <Footer dictionary={dictionary} />
      <LeyIAChatNubax />
    </main>
  );
}
