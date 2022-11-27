import React from 'react';
import Head from 'next/head';

const CustomHead = () => (
  <Head>
    <title key="title" itemProp="headline">
      Varuddo
    </title>
    <link rel="canonical" href="https://varuddo.com" />

    <meta name="title" content="Varuddo" />
    <meta itemProp="keywords" name="keywords" content="Фотограф, Фотография, фотосессия" />
    <meta
      itemProp="description"
      name="description"
      content="Привет! Меня зовут Лера, я фотограф. Нахожусь в Москве. Снимаю коммерцию, частные съемки и творчество"
    />

    <meta property="og:type" content="WebSite" />
    <meta property="og:title" content="Varuddo" />
    <meta property="og:image" content="img/profile.jpg" />
    <meta property="og:url" content="https://varuddo.com" />
    <meta property="og:site_name" content="Varuddo" />
    <meta
      property="og:description"
      content="Привет! Меня зовут Лера, я фотограф. Нахожусь в Москве. Снимаю коммерцию, частные съемки и творчество"
    />

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
