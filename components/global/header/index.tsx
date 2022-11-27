import React from 'react';
import Link from 'next/link';

import { Logo } from '@components/icons';
import Navbar from '@components/navbar';
import Burger from '@/components/burger';

import styles from './styles.module.scss';

const Header = () => (
  <header className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.logo_wrapper}>
        <Link className={styles.link} href="/" aria-label="Home">
          <Logo />
        </Link>
      </div>

      <div className={styles.burger}>
        <Burger />
      </div>

      <div className={styles.nav}>
        <Navbar />
      </div>
    </div>
  </header>
);

export default Header;
