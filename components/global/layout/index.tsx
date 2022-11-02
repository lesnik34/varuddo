import React from 'react';

import Footer from '@components/global/footer';
import Header from '@components/global/header';
import CustomHead from '@/components/global/head';
import Metrika from '@components/global/metrika';
import GTM from '@components/global/gtm';

interface LayoutI {
  children: JSX.Element | React.ReactNode;
}

const Layout: React.FC<LayoutI> = ({ children }) => (
  <>
    <CustomHead />

    <Header />

    <Metrika />
    <GTM />

    <main>{children}</main>

    <Footer />
  </>
);

export default Layout;
