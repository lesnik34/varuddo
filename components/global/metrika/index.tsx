import React from 'react';
import { YMInitializer } from 'react-yandex-metrika';

const Metrika = () => {
  const id = process.env.NEXT_PUBLIC_YANDEX_ANALYTICS_ID;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (id === undefined || isDevelopment || typeof window === 'undefined') {
    return null;
  }

  return (
    <YMInitializer
      accounts={[parseInt(id, 10)]}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
    />
  );
};

export default Metrika;
