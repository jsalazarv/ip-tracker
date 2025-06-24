import { useQuery } from '@tanstack/react-query';
import { IPService } from '@common/services/IPService';

export function useIP() {
  const { getIPService } = IPService();

  const getIP = (ip?: string) => {
    return useQuery({
      queryKey: ['ip', ip],
      queryFn: () => getIPService(ip),
      enabled: !!ip,
    });
  };

  return { getIP };
}
