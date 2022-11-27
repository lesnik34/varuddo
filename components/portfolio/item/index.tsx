import React, { useEffect, useRef } from 'react';
import cls from 'classnames';
import Image from 'next/image';

import imageShimmer from '@utils/shimmer';
import { PortfolioListI } from '@api/types';
import { getImagePath } from '@utils/helpers';

import styles from './styles.module.scss';

interface ItemI {
  item: PortfolioListI;
  portfolioList: { src: string; loading: string; alt: string }[];
  setCurrentIndex: (value: number) => void;
}

const Item: React.FC<ItemI> = ({ item, portfolioList, setCurrentIndex }) => {
  const { id, main_photo: mainPhoto, additional_photo: additionalPhoto, mode, '@collectionId': collectionId } = item;
  const mainRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (mainPhoto && mainRef.current && mode !== 'big_one') {
        const width = mainRef.current.offsetWidth;
        mainRef.current.style.height = `${(width / 4) * 5}px`;
      }

      if (additionalPhoto && additionalRef.current && mode !== 'big_one') {
        const width = additionalRef.current.offsetWidth;
        additionalRef.current.style.height = `${(width / 4) * 5}px`;
      }

      if (mainPhoto && mainRef.current && mode === 'big_one') {
        const width = mainRef.current.offsetWidth;
        mainRef.current.style.height = `${((width - 10) / 8) * 5}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [mainRef, additionalRef, mode, mainPhoto, additionalPhoto]);

  return (
    <div className={cls(styles.main, styles[mode])}>
      <div className={styles.main_photo} ref={mainRef}>
        <div className={styles.image_wrapper}>
          <Image
            className={styles.image}
            onClick={() => {
              const image = getImagePath(mainPhoto, id, collectionId);
              const index = portfolioList.findIndex((el) => el.src === image);
              setCurrentIndex(index);
            }}
            src={getImagePath(mainPhoto, id, collectionId)}
            alt="Фотография из портфолио"
            blurDataURL={imageShimmer()}
            loading="lazy"
            placeholder="blur"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
            fill
          />
        </div>
      </div>

      {additionalPhoto && (
        <div className={styles.additional_photo} ref={additionalRef}>
          <div className={styles.image_wrapper}>
            <Image
              className={styles.image}
              onClick={() => {
                const image = getImagePath(additionalPhoto, id, collectionId);
                const index = portfolioList.findIndex((el) => el.src === image);
                setCurrentIndex(index);
              }}
              src={getImagePath(additionalPhoto, id, collectionId)}
              alt="Фотография из портфолио"
              blurDataURL={imageShimmer()}
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
              fill
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
