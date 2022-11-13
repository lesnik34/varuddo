import React from 'react';
import type { GetStaticProps } from 'next';

import Api from '@/api';
import Portfolio from '@/components/portfolio';
import Layout from '@components/global/layout';
import { PortfolioListI, DefaultListResponseI } from '@/api/types';

interface HomeI {
  portfolio: DefaultListResponseI<PortfolioListI> | {};
}

const Home: React.FC<HomeI> = ({ portfolio }) => (
  <Layout>
    <Portfolio portfolio={'items' in portfolio ? portfolio.items : []} />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const portfolio = await Api.landing.getPortfolioData();

  return {
    props: { portfolio },
    revalidate: 12,
  };
};

export default Home;
