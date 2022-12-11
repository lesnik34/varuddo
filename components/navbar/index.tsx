import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.main}>
      <ul className={styles.list}>
        <li className={cls(styles.item, styles.portfolio)}>
          <Link className={cls(styles.link, { [styles.exact]: pathname === '/' })} href="/">
            Portfolio
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={cls(styles.link, { [styles.exact]: pathname === '/contact' })} href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
