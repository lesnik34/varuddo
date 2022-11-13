import { TStoreState } from '@store/.';

export const loadingSelector = (state: TStoreState) => state.app.loading;
