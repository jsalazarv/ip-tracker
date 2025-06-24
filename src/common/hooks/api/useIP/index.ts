import { useQuery } from '@tanstack/react-query';
import { IPService } from '@common/services/IPService';

export function useIP() {
  const { getIPService } = IPService();

  const getIP = (ip?: string) => {
    return useQuery({
      queryKey: ['ip', ip],
      queryFn: async () => {
        const response = await getIPService(ip);
        if (response.data.status === 'failed') {
          throw new Error(response.data.error.message);
        }
        return response;
      },
      enabled: !!ip,
      retry: false,
    });
  };

  return { getIP };
}
