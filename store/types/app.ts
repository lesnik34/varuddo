export interface AppState {
  loading: AppLoadingState;
  error: AppErrorState;
}

export interface AppLoadingState {
  [key: string]: {
    [key: string]: boolean;
  };
}

export interface AppErrorState {
  [key: string]: {
    [key: string]: {
      msg: string;
      code: string;
      data: any;
    };
  };
}

export interface AppRequestProps {
  apiName: string;
  apiMethod: string;
  data: any;
  beforeCallback?: () => any;
  afterCallback?: () => any;
}
