import React, { useMemo, useState } from 'react';
import Lightbox, { ImagesListType } from 'react-spring-lightbox';

import { PortfolioListI } from '@api/types';
import { getImagePath } from '@utils/helpers';

import Item from './item';
import styles from './styles.module.scss';

interface PortfolioI {
  portfolio: PortfolioListI[];
}

const Portfolio: React.FC<PortfolioI> = ({ portfolio }) => {
  const [isLightboxVisible, setLightboxVision] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const portfolioList = useMemo(
    () =>
      portfolio
        .map((el) => {
          const { id, main_photo: mainPhoto, additional_photo: additionalPhoto, '@collectionId': collectionId } = el;
          const elementsMap = [];

          if (mainPhoto) {
            elementsMap.push({
              src: getImagePath(mainPhoto, id, collectionId),
              loading: 'lazy',
              alt: 'Portfolio photo',
            });
          }

          if (additionalPhoto) {
            elementsMap.push({
              src: getImagePath(additionalPhoto, id, collectionId),
              loading: 'lazy',
              alt: 'Portfolio photo',
            });
          }

          return elementsMap;
        })
        .flat(),
    [portfolio],
  );

  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () => currentImageIndex + 1 < portfolioList.length && setCurrentIndex(currentImageIndex + 1);

  return (
    <section className={styles.main}>
      <h1 className="visually-hidden">Portfolio</h1>

      <ul className={styles.list}>
        {(portfolio || []).map((el) => (
          <li key={el.id}>
            <Item
              item={el}
              portfolioList={portfolioList}
              setCurrentIndex={(index) => {
                setLightboxVision(true);
                setCurrentIndex(index);
              }}
            />
          </li>
        ))}
      </ul>

      <Lightbox
        isOpen={isLightboxVisible}
        onPrev={gotoPrevious}
        className={styles.lightbox}
        onNext={gotoNext}
        images={portfolioList as ImagesListType}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxVision(false)}
      />
    </section>
  );
};

export default Portfolio;