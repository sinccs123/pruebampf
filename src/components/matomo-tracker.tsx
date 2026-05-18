'use client';

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { init, push } from '@socialgouv/matomo-next';

import { CONFIG } from '@/lib/config';

const MATOMO_URL = `https://${CONFIG.MATOMO_URL}/`;
const MATOMO_SITE_ID = CONFIG.MATOMO_SITE_ID!;

export default function MatomoTracker() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    return () => push(['HeatmapSessionRecording::disable']);
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    } else {
      if (pathname) {
        push(['setCustomUrl', pathname]);
        push(['trackPageView']);
        push(['enableLinkTracking']);
      }
    }
  }, [pathname]);

  return null;
}
