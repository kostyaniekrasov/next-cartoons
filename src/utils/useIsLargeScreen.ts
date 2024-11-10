'use client';

import { useEffect, useState } from 'react';

interface ScreenSizes {
  isMobileScreen: boolean;
  isTabletScreen: boolean;
  isDesktopScreen: boolean;
}

function useScreenSizes(): ScreenSizes {
  const [screenSizes, setScreenSizes] = useState<ScreenSizes>({
    isMobileScreen: false,
    isTabletScreen: false,
    isDesktopScreen: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScreenSizes = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia(
        '(min-width: 768px) and (max-width: 1023px)',
      ).matches;
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      setScreenSizes({
        isMobileScreen: isMobile,
        isTabletScreen: isTablet,
        isDesktopScreen: isDesktop,
      });
    };

    updateScreenSizes();

    const handleResize = () => updateScreenSizes();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSizes;
}

export default useScreenSizes;
