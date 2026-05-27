import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM = () => {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  const isDevelopment = process.env.NODE_ENV === 'development';
  const canInit = !!id && !isDevelopment && typeof window !== 'undefined';

  useEffect(() => {
    if (!canInit || !id) {
      return;
    }

    TagManager.initialize({
      gtmId: id,
    });
  }, [canInit, id]);

  if (!canInit) {
    return null;
  }

  return null;
};

export default GTM;
