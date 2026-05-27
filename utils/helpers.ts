export const getImagePath = (src: string, imageId: string, collectionId: string) =>
  `${process.env.STATIC_URL}/${collectionId}/${imageId}/${src}`;

const imageWidthSteps = [360, 480, 640, 828, 1080, 1200, 1600];

const normalizeImageWidth = (width: number) => imageWidthSteps.find((step) => step >= width) || 1600;

const withQueryParam = (src: string, query: string) => {
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}${query}`;
};

interface LoaderArgsI {
  src: string;
  width: number;
  quality?: number;
}

export const portfolioImageLoader = ({ src, width }: LoaderArgsI) => {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const safeWidth = normalizeImageWidth(Math.max(320, Math.min(width, 1600)));
  return withQueryParam(src, `thumb=${safeWidth}x0`);
};

export const withImageThumb = (src: string, thumb = '1600x0') => {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  return withQueryParam(src, `thumb=${thumb}`);
};

export const buildImageThumbSrcSet = (src: string, widths: number[]) => {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return '';
  }

  const uniqueSortedWidths = Array.from(new Set(widths))
    .filter((width) => Number.isFinite(width) && width > 0)
    .sort((a, b) => a - b);

  return uniqueSortedWidths.map((width) => `${withImageThumb(src, `${width}x0`)} ${width}w`).join(', ');
};
