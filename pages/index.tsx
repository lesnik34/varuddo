import React from 'react';
import type { GetStaticProps } from 'next';

import Api from '@/api';
import Layout from '@components/global/layout';

interface HomeI {
  results: any;
}

const Home: React.FC<HomeI> = ({ results = {} }) => <Layout>{JSON.stringify(results)}</Layout>;

export const getStaticProps: GetStaticProps = async () => {
  const results = await Api.landing.getLandingInfo();

  return {
    props: { results },
    revalidate: 12,
  };
};

export default Home;
