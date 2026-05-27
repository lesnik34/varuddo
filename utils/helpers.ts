export const getImagePath = (src: string, imageId: string, collectionId: string) =>
  `${process.env.STATIC_URL}/${collectionId}/${imageId}/${src}`;

export const getImageThumbPath = (src: string, imageId: string, collectionId: string, thumb = '900x0') =>
  `${getImagePath(src, imageId, collectionId)}?thumb=${thumb}`;
