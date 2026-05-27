import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';

import { ImageSizeI, PortfolioListI } from '@api/types';
import { buildImageThumbSrcSet, getImagePath, withImageThumb } from '@utils/helpers';

import styles from './styles.module.scss';

interface ItemI {
  item: PortfolioListI;
}

const GRID_DEFAULT_WIDTH = 640;
const GRID_SRCSET_WIDTHS = [360, 480, 640, 828, 1080, 1200];
const LIGHTBOX_MAX_WIDTH = 2500;
const LIGHTBOX_SRCSET_WIDTHS = [1200, 1600, 2200, LIGHTBOX_MAX_WIDTH];

const getScaledLightboxSize = (naturalWidth: number, naturalHeight: number, fallback: ImageSizeI): ImageSizeI => {
  if (!naturalWidth || !naturalHeight) {
    return fallback;
  }

  const width = LIGHTBOX_MAX_WIDTH;
  return {
    width,
    height: Math.max(1, Math.round((naturalHeight / naturalWidth) * width)),
  };
};

const Item: React.FC<ItemI> = ({ item }) => {
  const { id, main_photo: mainPhoto, additional_photo: additionalPhoto, mode, '@collectionId': collectionId } = item;
  const [isMainLoaded, setMainLoaded] = useState(false);
  const [isAdditionalLoaded, setAdditionalLoaded] = useState(false);
  const fallbackMainSize =
    mode === 'big_one' ? { width: LIGHTBOX_MAX_WIDTH, height: 1563 } : { width: LIGHTBOX_MAX_WIDTH, height: 3125 };
  const fallbackAdditionalSize = { width: LIGHTBOX_MAX_WIDTH, height: 3125 };
  const [mainSize, setMainSize] = useState<ImageSizeI>(item.main_photo_size || fallbackMainSize);
  const [additionalSize, setAdditionalSize] = useState<ImageSizeI>(
    item.additional_photo_size || fallbackAdditionalSize,
  );
  const mainRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);
  const mainPath = getImagePath(mainPhoto, id, collectionId);
  const additionalPath = additionalPhoto ? getImagePath(additionalPhoto, id, collectionId) : '';
  const mainGridPath = withImageThumb(mainPath, `${GRID_DEFAULT_WIDTH}x0`);
  const additionalGridPath = additionalPath ? withImageThumb(additionalPath, `${GRID_DEFAULT_WIDTH}x0`) : '';
  const mainPreviewPath = withImageThumb(mainPath, `${LIGHTBOX_MAX_WIDTH}x0`);
  const additionalPreviewPath = additionalPath ? withImageThumb(additionalPath, `${LIGHTBOX_MAX_WIDTH}x0`) : '';
  const mainGridSrcSet = buildImageThumbSrcSet(mainPath, GRID_SRCSET_WIDTHS);
  const additionalGridSrcSet = additionalPath ? buildImageThumbSrcSet(additionalPath, GRID_SRCSET_WIDTHS) : '';
  const mainPreviewSrcSet = buildImageThumbSrcSet(mainPath, LIGHTBOX_SRCSET_WIDTHS);
  const additionalPreviewSrcSet = additionalPath ? buildImageThumbSrcSet(additionalPath, LIGHTBOX_SRCSET_WIDTHS) : '';

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
  }, [additionalPhoto, mainPhoto, mode]);

  return (
    <div className={cls(styles.main, styles[mode])}>
      <div className={styles.main_photo} ref={mainRef}>
        <div className={cls(styles.image_wrapper, { [styles.loading]: !isMainLoaded, [styles.loaded]: isMainLoaded })}>
          {!isMainLoaded && <span className={styles.loading_overlay} aria-hidden="true" />}
          <a
            href={mainPreviewPath}
            data-pswp-src={mainPreviewPath}
            data-pswp-srcset={mainPreviewSrcSet}
            className={styles.gallery_link}
            data-pswp-width={mainSize.width}
            data-pswp-height={mainSize.height}
            data-cropped="true"
            aria-label="Открыть фото"
          >
            <img
              className={styles.image}
              src={mainGridPath}
              srcSet={mainGridSrcSet}
              alt="Фотография из портфолио"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, (max-width: 1919px) 33vw, 20vw"
              onLoad={(event) => {
                setMainLoaded(true);
                const { naturalWidth, naturalHeight } = event.currentTarget;
                const nextSize = getScaledLightboxSize(naturalWidth, naturalHeight, fallbackMainSize);
                setMainSize((prevSize) =>
                  prevSize.width === nextSize.width && prevSize.height === nextSize.height ? prevSize : nextSize,
                );
              }}
              onError={() => setMainLoaded(true)}
              draggable={false}
            />
          </a>
        </div>
      </div>

      {additionalPhoto && (
        <div className={styles.additional_photo} ref={additionalRef}>
          <div
            className={cls(styles.image_wrapper, {
              [styles.loading]: !isAdditionalLoaded,
              [styles.loaded]: isAdditionalLoaded,
            })}
          >
            {!isAdditionalLoaded && <span className={styles.loading_overlay} aria-hidden="true" />}
            <a
              href={additionalPreviewPath}
              data-pswp-src={additionalPreviewPath}
              data-pswp-srcset={additionalPreviewSrcSet}
              className={styles.gallery_link}
              data-pswp-width={additionalSize.width}
              data-pswp-height={additionalSize.height}
              data-cropped="true"
              aria-label="Открыть фото"
            >
              <img
                className={styles.image}
                src={additionalGridPath}
                srcSet={additionalGridSrcSet}
                alt="Фотография из портфолио"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, (max-width: 1919px) 33vw, 20vw"
                onLoad={(event) => {
                  setAdditionalLoaded(true);
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  const nextSize = getScaledLightboxSize(naturalWidth, naturalHeight, fallbackAdditionalSize);
                  setAdditionalSize((prevSize) =>
                    prevSize.width === nextSize.width && prevSize.height === nextSize.height ? prevSize : nextSize,
                  );
                }}
                onError={() => setAdditionalLoaded(true)}
                draggable={false}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
