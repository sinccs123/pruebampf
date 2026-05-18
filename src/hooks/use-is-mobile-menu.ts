'use client';

import { useEffect, useState } from 'react';

export default function useIsMobileMenu() {
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobileMenu(window.innerWidth < 1024);
      const handleResize = () => setIsMobileMenu(window.innerWidth < 1024);
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return {
    isMobileMenu,
    setIsMobileMenu,
  };
}
