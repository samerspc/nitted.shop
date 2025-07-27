import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

import item1 from '/hero_section/item1.png';
import item2 from '/hero_section/item2.png';
import item3 from '/hero_section/item3.png';
import item4 from '/hero_section/item4.png';

const HeroSection: FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.texts}>
        <p className={`${styles.texts_logo} crimson-text-regular`}>nitted.</p>
        <p className={styles.texts_p}>
          мы продаем оригинальные брендовые вещи. если вы хотите, чтобы ваш свэг копировали{' '}
          <span className="aeroport">—</span> двигайтесь с нами.
        </p>
        <div className={styles.texts_links}>
          <Link to={'/catalog/male'}>Мужской каталог</Link>
          <Link to={'/catalog/female'}>Женский каталог</Link>
        </div>
      </div>

      <img src={item1} alt="" className={styles.item1} />
      <img src={item2} alt="" className={styles.item2} />
      <img src={item3} alt="" className={styles.item3} />
      <img src={item4} alt="" className={styles.item4} />
    </section>
  );
};

export default HeroSection;
