'use client';

import { useLayoutEffect, useState } from 'react';

function useIsMobileScreen(): { isMobileScreen: boolean } {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 640px)');
    setIsMobileScreen(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobileScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return { isMobileScreen };
}

export default useIsMobileScreen;
