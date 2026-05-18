import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { CONFIG } from '@/lib/config';
import { getDictionary } from '@/lib/dictionary';
import { i18n, type Locale } from '@/lib/i18n';

import MatomoTracker from '@/components/matomo-tracker';

import Script from 'next/script';
import '../globals.css';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ['latin'] });
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: Omit<RootLayoutProps, 'children'>): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return {
    title: dictionary['metadata'].title,
    description: dictionary['metadata'].description,
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  return (
    <html lang={lang} className='scroll-smooth'>
      <head>
        <meta
          httpEquiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
      </head>
      <body className={`${inter.className} font-heebo bg-white md:bg-gray-200 ultra-wide-type`}>
        {children}
        <MatomoTracker />
      </body>

      {/* <Script src={`${CONFIG.LANGFLOW_EMBEDDED_CHAT_BUNDLE}`} />
      <Script src='static/js/bundle.min.js' />
      */}
    </html>
  );
}
