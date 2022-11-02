import TagManager from 'react-gtm-module';

const GTM = () => {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (id === undefined || isDevelopment || typeof window === 'undefined') {
    return null;
  }

  TagManager.initialize({
    gtmId: id,
  });

  return null;
};

export default GTM;
