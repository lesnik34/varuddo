import React from 'react';

import Layout from '@components/global/layout';
import Contacts from '@components/contacts';

const Contact = () => (
  <Layout
    seo={{
      title: 'Контакты | Varuddo',
      canonical: 'https://varuddo.com/contact',
      description:
        'Фотограф Лера (Varuddo), Москва. Коммерческие и индивидуальные съемки. Telegram: @varuddo, email: varuddo@gmail.com.',
    }}
  >
    <Contacts />
  </Layout>
);

export default Contact;
