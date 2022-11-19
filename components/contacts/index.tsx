import React from 'react';

import ContactMe from './contact_me';

import styles from './styles.module.scss';

const Contacts = () => (
  <section className={styles.main}>
    <h1 className="visually-hidden">Portfolio</h1>

    <h2 className={styles.title}>Способы связи:</h2>

    <ContactMe />

    <div className={styles.location}>
      {/* <span className={styles.text}>Based in Moscow</span> */}

      <a className={styles.link} target="_blank" rel="noreferrer" href="tel:79287771788">
        7 928 777 17 88
      </a>

      <a className={styles.link} target="_blank" rel="noreferrer" href="mailto:varuddo@gmail.com">
        varuddo@gmail.com
      </a>
    </div>

    <div className={styles.social}>
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href="https://instagram.com/varuddo?igshid=YmMyMTA2M2Y="
      >
        Instagram/varudoo
      </a>

      <a className={styles.link} target="_blank" rel="noreferrer" href="https://t.me/varuddo">
        Telegram@varuddo
      </a>
    </div>
  </section>
);

export default Contacts;
