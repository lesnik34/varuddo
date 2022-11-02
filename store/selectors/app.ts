import type { TStoreState } from '@store/.';

export const loadingSelector = (state: TStoreState) => state.app.loading;
export const errorSelector = (state: TStoreState) => state.app.error;
