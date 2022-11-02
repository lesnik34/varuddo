import { useState, useEffect } from 'react';

import { MIN_DESKTOP_WIDTH, MIN_TABLET_WIDTH } from '@utils/constants';

const useWindowSize = () => {
  const isDesktopWidth = () =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${MIN_DESKTOP_WIDTH}px)`).matches : false;
  const isTabletWidth = () =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${MIN_TABLET_WIDTH}px)`).matches : false;
  const isRetinaScreen = () =>
    typeof window !== 'undefined' ? window.matchMedia('(min-resolution: 2dppx)').matches : false;

  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  const [device, setDevice] = useState<{
    isDesktopWidth: boolean | undefined;
    isTabletWidth: boolean | undefined;
    isMobileWidth: boolean | undefined;
    isRetina: boolean | undefined;
  }>({
    isDesktopWidth: undefined,
    isTabletWidth: undefined,
    isMobileWidth: undefined,
    isRetina: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const isTablet = isTabletWidth();
      const isDesktop = isDesktopWidth();
      const isMobile = !isDesktop && !isTablet;
      const isRetina = isRetinaScreen();

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setDevice({
        isDesktopWidth: isDesktop,
        isTabletWidth: isTablet,
        isMobileWidth: isMobile,
        isRetina,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowSize, device };
};

export default useWindowSize;
