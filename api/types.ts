export interface PortfolioDataI extends DefaultListResponseI<{}> {}

export type PhotoModeT = 'left_small' | 'right_small' | 'equals_small' | 'equals_big' | 'big_one';

export interface ImageSizeI {
  width: number;
  height: number;
}

export interface PortfolioListI {
  '@collectionId': string;
  '@collectionName': string;
  id: string;
  created: string;
  updated: string;
  main_photo: string;
  additional_photo: string;
  mode: PhotoModeT;
  main_photo_size?: ImageSizeI | null;
  additional_photo_size?: ImageSizeI | null;
}
export interface DefaultListResponseI<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}
