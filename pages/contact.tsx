import React from 'react';

import Layout from '@components/global/layout';
import Contacts from '@components/contacts';

const Contact = () => (
  <Layout
    seo={{
      title: 'Контакты | Varuddo',
      canonical: 'https://varuddo.com/contact',
      description: 'Контакты фотографа Varuddo: Instagram и Telegram.',
    }}
  >
    <Contacts />
  </Layout>
);

export default Contact;
