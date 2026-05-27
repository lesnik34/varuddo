import React from 'react';

import Footer from '@components/global/footer';
import Header from '@components/global/header';
import CustomHead from '@/components/global/head';
import Metrika from '@components/global/metrika';
import GTM from '@components/global/gtm';

import styles from './styles.module.scss';

interface LayoutI {
  children: JSX.Element | React.ReactNode;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
}

const Layout: React.FC<LayoutI> = ({ children, seo }) => (
  <>
    <CustomHead {...seo} />

    <div className="container">
      <div className={styles.wrapper}>
        <Header />

        <Metrika />
        <GTM />

        <main>{children}</main>
      </div>

      <Footer />
    </div>
  </>
);

export default Layout;
