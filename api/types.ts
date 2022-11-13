export interface PortfolioDataI extends DefaultListResponseI<{}> {}

export type PhotoModeT = 'left_small' | 'right_small' | 'equals_small' | 'equals_big' | 'big_one';

export interface PortfolioListI {
  '@collectionId': string;
  '@collectionName': string;
  id: string;
  created: string;
  updated: string;
  main_photo: string;
  additional_photo: string;
  mode: PhotoModeT;
}
export interface DefaultListResponseI<T> {
  page: number;
  perPage: number;
  totalItems: number;
  items: T[];
}
