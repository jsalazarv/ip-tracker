import { useQuery } from '@tanstack/react-query';
import { IPService } from '@common/services/IPService';

export function useIP() {
  const { getIPService } = IPService();

  const getIP = () => {
    return useQuery({
      queryKey: ['ip'],
      queryFn: () => getIPService(),
    });
  };

  return { getIP };
}
