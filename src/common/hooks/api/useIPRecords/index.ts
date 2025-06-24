import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ipRecordsService } from '@common/services/supabase/ipRecords';

export const useIPRecords = () => {
  const queryClient = useQueryClient();
  const queryKey = ['ip-records'];

  // Obtener todos los registros
  const { data: records = [], isLoading } = useQuery({
    queryKey,
    queryFn: ipRecordsService.getAll,
  });

  // Buscar registros
  const { mutateAsync: searchRecords } = useMutation({
    mutationFn: ipRecordsService.search,
    onError: (error) => {
      console.error('Error searching IP records:', error);
      toast.error('Error al buscar registros');
    },
  });

  interface IPData {
    ip: string;
    type: string;
    city: { name: string };
    country: { name: string; code: string; flag: { emoji: string } };
    location: { latitude: number; longitude: number };
    asn: { organisation: string };
    security: { is_threat: boolean };
  }

  // Guardar nuevo registro
  const { mutateAsync: saveRecord } = useMutation({
    mutationFn: async (data: IPData) => {
      const record = {
        ip: data.ip,
        type: data.type,
        city: data.city.name,
        country: data.country.name,
        country_code: data.country.code,
        flag_emoji: data.country.flag.emoji,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        isp: data.asn.organisation,
        is_threat: data.security.is_threat,
      };

      return ipRecordsService.create(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('IP guardada correctamente');
    },
    onError: (error: Error & { code?: string }) => {
      console.error('Error saving IP record:', error);
      if (error.code === '23505') {
        toast.warning('Esta IP ya existe en el historial');
      } else {
        toast.error('Error al guardar la IP');
      }
    },
  });

  // Eliminar registro
  const { mutateAsync: deleteRecord } = useMutation({
    mutationFn: ipRecordsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('IP eliminada correctamente');
    },
    onError: (error) => {
      console.error('Error deleting IP record:', error);
      toast.error('Error al eliminar la IP');
    },
  });

  return {
    records,
    isLoading,
    saveRecord,
    deleteRecord,
    searchRecords,
  };
};
