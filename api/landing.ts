import Http from './http';
import { PortfolioDataI } from './types';

const LandingAPI = {
  getPortfolioData: async (): Promise<any> => {
    try {
      const instance = Http.Public();
      const response = await instance.get<PortfolioDataI>('/collections/portfolio/records', {
        params: {
          sort: 'position',
          perPage: 200,
        },
      });

      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  },

  sendMail: async (data: any): Promise<any> => {
    try {
      const instance = Http.Private();
      const response = await instance.post<PortfolioDataI>('/send-email', data);

      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  },
};

export default LandingAPI;
