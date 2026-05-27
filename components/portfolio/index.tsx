import React, { useCallback, useEffect, useRef, useState } from 'react';

import Api from '@/api';
import { DefaultListResponseI, PortfolioListI } from '@api/types';

import Item from './item';
import styles from './styles.module.scss';

interface PortfolioI {
  portfolio: DefaultListResponseI<PortfolioListI>;
}

const Portfolio: React.FC<PortfolioI> = ({ portfolio }) => {
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioListI[]>(portfolio.items || []);
  const [pagination, setPagination] = useState({
    page: portfolio.page || 1,
    perPage: portfolio.perPage || 30,
    totalItems: portfolio.totalItems ?? (portfolio.items || []).length,
    totalPages:
      portfolio.totalPages ||
      Math.max(
        1,
        Math.ceil(((portfolio.totalItems ?? (portfolio.items || []).length) || 0) / (portfolio.perPage || 30)),
      ),
  });
  const galleryRef = useRef<HTMLUListElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const hasMoreRef = useRef(false);
  const loadNextPageRef = useRef<() => Promise<boolean>>(async () => false);
  const currentSlideIndexRef = useRef<number | null>(null);
  const lastOpenedThumbRef = useRef<HTMLAnchorElement | null>(null);
  const hasMore = pagination.page < pagination.totalPages;

  const getGalleryAnchors = useCallback(
    () => Array.from(galleryRef.current?.querySelectorAll('a[data-pswp-width]') || []) as HTMLAnchorElement[],
    [],
  );

  const getLightboxItemData = useCallback(
    (index: number, fallback: any) => {
      const anchor = getGalleryAnchors()[index];
      if (!anchor) {
        return fallback;
      }

      const image = anchor.querySelector('img');
      const width = Number.parseInt(anchor.dataset.pswpWidth || '0', 10) || 0;
      const height = Number.parseInt(anchor.dataset.pswpHeight || '0', 10) || 0;

      return {
        ...fallback,
        element: anchor,
        src: anchor.dataset.pswpSrc || anchor.href,
        srcset: anchor.dataset.pswpSrcset,
        width,
        height,
        w: width,
        h: height,
        msrc: image?.currentSrc || image?.getAttribute('src') || undefined,
        alt: image?.getAttribute('alt') || '',
        thumbCropped: Boolean(anchor.dataset.pswpCropped || anchor.dataset.cropped),
      };
    },
    [getGalleryAnchors],
  );

  const scrollToCurrentPortfolioImage = useCallback(() => {
    const anchors = getGalleryAnchors();
    const currentAnchor =
      typeof currentSlideIndexRef.current === 'number' ? anchors[currentSlideIndexRef.current] || null : null;
    const target = currentAnchor || lastOpenedThumbRef.current;

    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    });
  }, [getGalleryAnchors]);

  const loadNextPage = useCallback(async (): Promise<boolean> => {
    if (loadingMoreRef.current || !hasMore) {
      return false;
    }

    loadingMoreRef.current = true;
    setLoadingMore(true);
    const nextPage = pagination.page + 1;
    const response = await Api.landing.getPortfolioData({ page: nextPage, perPage: pagination.perPage });
    let hasUpdates = false;

    if ('items' in response) {
      const responsePerPage = response.perPage || pagination.perPage;
      const responseTotalItems = response.totalItems ?? pagination.totalItems;
      const totalPages = response.totalPages || Math.max(1, Math.ceil((responseTotalItems || 0) / responsePerPage));

      setPortfolioItems((prev) => {
        const ids = new Set(prev.map((item) => item.id));
        const uniqueNewItems = response.items.filter((item: PortfolioListI) => !ids.has(item.id));
        hasUpdates = uniqueNewItems.length > 0;
        return [...prev, ...uniqueNewItems];
      });

      setPagination({
        page: response.page || nextPage,
        perPage: responsePerPage,
        totalItems: responseTotalItems,
        totalPages,
      });
    } else {
      setPagination((prev) => ({
        ...prev,
        page: prev.totalPages,
      }));
    }

    loadingMoreRef.current = false;
    setLoadingMore(false);
    return hasUpdates;
  }, [hasMore, pagination.page, pagination.perPage, pagination.totalItems]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    loadNextPageRef.current = loadNextPage;
  }, [loadNextPage]);

  useEffect(() => {
    let lightbox: any;
    let isCancelled = false;

    const initLightbox = async () => {
      if (!galleryRef.current) {
        return;
      }
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const showHideAnimationType = prefersReducedMotion ? 'none' : 'fade';

      // eslint-disable-next-line import/no-unresolved
      const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');

      if (isCancelled || !galleryRef.current) {
        return;
      }

      lightbox = new PhotoSwipeLightbox({
        gallery: galleryRef.current,
        children: 'a[data-pswp-width]',
        showHideAnimationType,
        showAnimationDuration: prefersReducedMotion ? 0 : 220,
        hideAnimationDuration: prefersReducedMotion ? 0 : 180,
        zoomAnimationDuration: prefersReducedMotion ? 0 : 140,
        easing: 'cubic-bezier(.25,.1,.25,1)',
        bgOpacity: 0.92,
        spacing: 0.08,
        maxZoomLevel: 2,
        wheelToZoom: true,
        pinchToClose: false,
        zoom: false,
        counter: false,
        preload: [1, 1],
        maxWidthToAnimate: 1400,
        paddingFn: (viewportSize) => {
          const edgePadding = viewportSize.x >= 1280 ? 56 : 24;
          const verticalPadding = viewportSize.x >= 1280 ? 40 : 20;
          return {
            top: verticalPadding,
            bottom: verticalPadding,
            left: edgePadding,
            right: edgePadding,
          };
        },
        // eslint-disable-next-line import/no-unresolved
        pswpModule: () => import('photoswipe'),
      });

      lightbox.addFilter('numItems', () => getGalleryAnchors().length);
      lightbox.addFilter('itemData', (itemData: any, index: number) => getLightboxItemData(index, itemData));

      lightbox.on('change', async () => {
        const { pswp } = lightbox;
        if (!pswp) {
          return;
        }

        currentSlideIndexRef.current = pswp.currIndex;

        if (loadingMoreRef.current || !hasMoreRef.current) {
          return;
        }

        const nearTheEnd = pswp.currIndex >= pswp.getNumItems() - 2;
        if (!nearTheEnd) {
          return;
        }

        const hasLoadedNewItems = await loadNextPageRef.current();

        if (hasLoadedNewItems) {
          pswp.mainScroll.resize(true);
          pswp.ui?.update();
        }
      });

      lightbox.on('afterInit', () => {
        currentSlideIndexRef.current = lightbox.pswp?.currIndex ?? currentSlideIndexRef.current;
      });

      lightbox.on('closingAnimationEnd', () => {
        scrollToCurrentPortfolioImage();
      });

      lightbox.init();
    };

    initLightbox();

    return () => {
      isCancelled = true;
      lightbox?.destroy();
    };
  }, [getGalleryAnchors, getLightboxItemData, scrollToCurrentPortfolioImage]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) {
      return () => undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: '350px 0px' },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadNextPage]);

  return (
    <section className={styles.main}>
      <h1 className="visually-hidden">Portfolio</h1>

      <ul
        className={styles.list}
        ref={galleryRef}
        onClickCapture={(event) => {
          const target = event.target as HTMLElement;
          const anchor = target.closest('a[data-pswp-width]') as HTMLAnchorElement | null;
          if (anchor) {
            lastOpenedThumbRef.current = anchor;
            const anchorIndex = getGalleryAnchors().indexOf(anchor);
            currentSlideIndexRef.current = anchorIndex >= 0 ? anchorIndex : null;
          }
        }}
      >
        {portfolioItems.map((el) => (
          <li key={el.id}>
            <Item item={el} />
          </li>
        ))}
      </ul>

      <div className={styles.load_more} ref={loadMoreRef}>
        {isLoadingMore && <span className={styles.load_more_text}>Загружаем еще...</span>}
      </div>
    </section>
  );
};

export default Portfolio;
