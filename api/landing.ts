import Http from './http';
import { TestI } from './types';

const LandingAPI = {
  getLandingInfo: async (): Promise<any> => {
    const instance = Http.Public();

    try {
      const response: TestI = await instance.get('/test');

      return response.body;
    } catch (e: any) {
      return {
        success: false,
        error: {
          uuid: '',
          code: '',
          title: 'Системная ошибка',
          text: (e as Error).message,
        },
      };
    }
  },
};

export default LandingAPI;
