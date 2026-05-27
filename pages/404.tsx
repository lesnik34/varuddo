import React from 'react';

import Layout from '@components/global/layout';

const Custom404 = () => (
  <Layout
    seo={{
      title: '404 | Varuddo',
      canonical: 'https://varuddo.com/404',
      description: 'Страница не найдена.',
      noIndex: true,
    }}
  >
    <div style={{ width: '100%', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '60px' }}>404</p>
    </div>
  </Layout>
);

export default Custom404;
