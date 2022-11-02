import React from 'react';
import Head from 'next/head';

const CustomHead = () => (
  <Head>
    <title key="title" itemProp="headline">
      Заголовок
    </title>
    <link rel="canonical" href="https://test.ru" />

    <meta name="title" content="Заголовок" />
    <meta itemProp="keywords" name="keywords" content="Ключевые слова" />
    <meta itemProp="description" name="description" content="Описание" />

    <meta property="og:type" content="WebSite" />
    <meta property="og:title" content="Заголовок" />
    <meta property="og:image" content="https://static.url/image.png" />
    <meta property="og:url" content="https://test.ru" />
    <meta property="og:site_name" content="Название сайта" />
    <meta property="og:description" content="Описание" />

    <link rel="manifest" href="fav/site.webmanifest.json" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="robots" content="all" />
    <meta name="msapplication-TileImage" content="fav/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />
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
