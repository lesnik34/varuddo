import React from 'react';

import styles from './styles.module.scss';

const Contacts = () => (
  <section className={styles.main}>
    <h1 className="visually-hidden">Контакты</h1>

    <div className={styles.video_block}>
      <video className={styles.video} src="/video/mov.mp4" autoPlay muted loop playsInline preload="metadata" />
    </div>

    <div className={styles.headline}>
      <span className={styles.kicker}>Varuddo</span>
      <h2 className={styles.title}>Обо мне</h2>
      <p className={styles.description}>
        Привет! Меня зовут Лера, я фотограф в Москве.
        <br />
        Провожу индивидуальные и коммерческие съемки: портреты, контент для соцсетей, брендов и личных проектов. Для
        меня важно, чтобы съемка была не только про красивые кадры, но и про комфортный процесс: без лишней суеты и
        стресса, с понятной подготовкой и помощью, а также вниманию к деталям.
        <br />
        Если хотите обсудить идею, подобрать формат или просто понять, что именно вам подойдет, напишите мне любым
        удобным для вас способом
      </p>
    </div>

    <div className={styles.links}>
      <a className={styles.link} target="_blank" rel="noreferrer" href="https://t.me/varuddo">
        Написать в Telegram
      </a>
      <a className={styles.link} href="mailto:varuddo@gmail.com">
        varuddo@gmail.com
      </a>
    </div>

    <p className={styles.social_text}>
      Соц. сети: <span className={styles.handle}>@varuddo</span>
    </p>
  </section>
);

export default Contacts;
