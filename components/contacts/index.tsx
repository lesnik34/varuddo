import React from 'react';

import styles from './styles.module.scss';

const Contacts = () => (
  <section className={styles.main}>
    <h1 className="visually-hidden">Контакты</h1>

    <div className={styles.headline}>
      <span className={styles.kicker}>Get in touch</span>
      <h2 className={styles.title}>Socials</h2>
      <p className={styles.description}>По всем вопросам пишите в Instagram или Telegram.</p>
    </div>

    <div className={styles.links}>
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href="https://instagram.com/varuddo?igshid=YmMyMTA2M2Y="
      >
        Instagram
      </a>

      <a className={styles.link} target="_blank" rel="noreferrer" href="https://t.me/varuddo">
        Telegram
      </a>
    </div>
  </section>
);

export default Contacts;
