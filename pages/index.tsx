import React from 'react';
import type { GetStaticProps } from 'next';

import Api from '@/api';
import Portfolio from '@/components/portfolio';
import Layout from '@components/global/layout';
import { PortfolioListI, DefaultListResponseI } from '@/api/types';

interface HomeI {
  portfolio: DefaultListResponseI<PortfolioListI>;
}

const Home: React.FC<HomeI> = ({ portfolio }) => (
  <Layout
    seo={{
      title: 'Varuddo | Фотограф в Москве',
      canonical: 'https://varuddo.com/',
      description: 'Портфолио фотографа в Москве: коммерческие, индивидуальные и творческие съемки.',
    }}
  >
    <Portfolio portfolio={portfolio} />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const portfolioResponse = await Api.landing.getPortfolioData({ page: 1, perPage: 30 });
  const portfolio: DefaultListResponseI<PortfolioListI> =
    'items' in portfolioResponse
      ? portfolioResponse
      : {
          page: 1,
          perPage: 30,
          totalItems: 0,
          totalPages: 1,
          items: [],
        };

  return {
    props: { portfolio },
    revalidate: 600,
  };
};

export default Home;
