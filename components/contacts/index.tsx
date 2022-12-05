import React from 'react';
import Image from 'next/image';

import ContactMe from './contact_me';

import styles from './styles.module.scss';

const Contacts = () => (
  <section className={styles.main}>
    <h1 className="visually-hidden">Portfolio</h1>

    <h2 className={styles.title}>Контакты:</h2>

    <div className={styles.description_wrapper}>
      {/* <div className={styles.image_wrapper}>
        <Image className={styles.image} src="/img/profile.jpg" alt="Фотограф" fill />
      </div> */}

      <p className={styles.description}>
        Привет! Меня зовут Лера, я фотограф. Снимаю в Москве. Провожу коммерческие и индивидуальные съемки. По всем вопросам можете связаться со мной удобным для вас способом
      </p>
    </div>

    <ContactMe />

    <div className={styles.location}>
    {/* <span className={styles.text}>Локация - Москва</span> */}

      <a className={styles.link} target="_blank" rel="noreferrer" href="tel:79287771788">
        7 928 777 17 88
      </a>

      <a className={styles.link} target="_blank" rel="noreferrer" href="mailto:varuddo@gmail.com">
        varuddo@gmail.com
      </a>
    </div>

    <div className={styles.social}>
      <a className={styles.link} target="_blank" rel="noreferrer" href="https://wa.me/79287771788">
        WhatsApp
      </a>
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
