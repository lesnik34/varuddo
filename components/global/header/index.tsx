import React from 'react';
import Link from 'next/link';

import useWindowSize from '@hooks/device_size';
import { Logo } from '@components/icons';
import Navbar from '@components/navbar';
import Burger from '@/components/burger';

import styles from './styles.module.scss';

const Header = () => {
  const { device } = useWindowSize();

  return (
    <header className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.logo_wrapper}>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div>{device.isMobileWidth ? <Burger /> : <Navbar />}</div>
      </div>
    </header>
  );
};

export default Header;
