import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import cls from 'classnames';
import { useRouter } from 'next/router';

import Navigation from '@components/navbar';

import styles from './style.module.scss';

const Burger = () => {
  const [isVisible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setVisible(false);
  }, [router.asPath]);

  const toggleBurger = () => {
    setVisible((state) => !state);
  };

  return (
    <CSSTransition
      in={isVisible}
      classNames={{
        enterActive: styles['anim-enter'],
        enterDone: styles['anim-enter-done'],
        exitActive: styles['anim-exit'],
        exitDone: styles['anim-exit-done'],
      }}
      timeout={400}
    >
      <div className={cls(styles.main)}>
        <button type="button" onClick={toggleBurger} className={styles.burger} aria-label="Burger">
          <div className={styles.burger_line} />
        </button>

        <div className={styles.popup}>
          <div className="container">
            <div className={styles.wrapper}>
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Burger;
