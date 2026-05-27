import React from 'react';
import Head from 'next/head';

interface CustomHeadI {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const defaults = {
  title: 'Varuddo',
  canonical: 'https://varuddo.com',
  ogImage: 'https://varuddo.com/img/profile.jpg',
  description: 'Привет! Меня зовут Лера, я фотограф. Нахожусь в Москве. Снимаю коммерцию, частные съемки и творчество',
};

const CustomHead: React.FC<CustomHeadI> = ({ title, description, canonical, ogImage, noIndex = false }) => (
  <Head>
    <title key="title" itemProp="headline">
      {title || defaults.title}
    </title>
    <link rel="canonical" href={canonical || defaults.canonical} />

    <meta name="title" content={title || defaults.title} />
    <meta itemProp="keywords" name="keywords" content="Фотограф, Фотография, фотосессия" />
    <meta itemProp="description" name="description" content={description || defaults.description} />
    {noIndex && <meta name="robots" content="noindex,nofollow" />}

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title || defaults.title} />
    <meta property="og:image" content={ogImage || defaults.ogImage} />
    <meta property="og:url" content={canonical || defaults.canonical} />
    <meta property="og:site_name" content="Varuddo" />
    <meta property="og:description" content={description || defaults.description} />
    <meta property="og:locale" content="ru_RU" />

    <link rel="apple-touch-icon" sizes="180x180" href="fav/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="fav/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="fav/favicon-16x16.png" />
    <link rel="manifest" href="fav/site.webmanifest" />
    <link rel="mask-icon" href="fav/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);

export default CustomHead;
