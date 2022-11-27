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

  const LightBoxHeader = () => (
    <div onClick={() => setLightboxVision(false)} className={styles.lightbox_header}>
      <button
        onClick={() => setLightboxVision(false)}
        type="button"
        className={styles.lightbox_close}
        aria-label="Close"
      />
    </div>
  );

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
        renderHeader={LightBoxHeader}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxVision(false)}
        pageTransitionConfig={{
          from: { transform: 'scale(0.75)', opacity: 0 },
          enter: { transform: 'scale(1)', opacity: 1 },
          leave: { opacity: 0 },
          config: { mass: 1, tension: 320, friction: 32 },
        }}
      />
    </section>
  );
};

export default Portfolio;
