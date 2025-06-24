import { supabase } from '.';
import { Database, IpRecord } from './types';

export const ipRecordsService = {
  /**
   * Obtiene todos los registros de IP ordenados por fecha de creación
   */
  async getAll(): Promise<IpRecord[]> {
    const { data, error } = await supabase
      .from('ip_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Busca una IP específica
   */
  async findByIp(ip: string): Promise<IpRecord | null> {
    const { data, error } = await supabase
      .from('ip_records')
      .select('*')
      .eq('ip', ip)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Guarda un nuevo registro de IP
   */
  async create(
    record: Database['public']['Tables']['ip_records']['Insert'],
  ): Promise<IpRecord> {
    const { data, error } = await supabase
      .from('ip_records')
      .insert(record)
      .select()
      .single();

    if (error) {
      // Si el error es de duplicado, obtenemos el registro existente
      if (error.code === '23505') {
        const existing = await this.findByIp(record.ip);
        if (existing) return existing;
      }
      throw error;
    }

    return data;
  },

  /**
   * Elimina un registro de IP por su ID
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('ip_records').delete().eq('id', id);

    if (error) throw error;
  },

  /**
   * Busca IPs por texto (ciudad, país o IP)
   */
  async search(query: string): Promise<IpRecord[]> {
    const { data, error } = await supabase
      .from('ip_records')
      .select('*')
      .or(`ip.ilike.%${query}%,city.ilike.%${query}%,country.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
