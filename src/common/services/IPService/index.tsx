import { useAxios } from '@common/services/api';

const { createExternalClient } = useAxios();

export const IPService = () => {
  return {
    async getIPService(ip?: string) {
      console.log('Base URL:', import.meta.env.VITE_APP_GEO_LOCATION_URL);
      const client = createExternalClient({
        baseURL: 'https://ip-geo-location.p.rapidapi.com',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': import.meta.env.VITE_APP_RAPIDAPI_HOST,
        },
      });

      const response = await client.get(`/ip/${ip}`);
      return response;
    },
  };
};
