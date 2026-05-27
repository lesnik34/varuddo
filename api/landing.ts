import Http from './http';
import { PortfolioDataI } from './types';

interface PortfolioRequestParamsI {
  page?: number;
  perPage?: number;
}

const LandingAPI = {
  getPortfolioData: async ({ page = 1, perPage = 30 }: PortfolioRequestParamsI = {}): Promise<PortfolioDataI | any> => {
    try {
      const instance = Http.Public();
      const response = await instance.get<PortfolioDataI>('/collections/portfolio/records', {
        params: {
          sort: 'position',
          page,
          perPage,
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
};

export default LandingAPI;
