export const getImagePath = (src: string, imageId: string, collectionId: string) =>
  `${process.env.STATIC_URL}/${collectionId}/${imageId}/${src}`;
