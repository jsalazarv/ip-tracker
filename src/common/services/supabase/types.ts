export interface IpRecord {
  id: string;
  created_at: string;
  ip: string;
  type: string;
  city: string;
  country: string;
  country_code: string;
  flag_emoji: string;
  latitude: number;
  longitude: number;
  isp: string;
  is_threat: boolean;
}

export interface Database {
  public: {
    Tables: {
      ip_records: {
        Row: IpRecord;
        Insert: Omit<IpRecord, 'id' | 'created_at'>;
        Update: Partial<Omit<IpRecord, 'id' | 'created_at'>>;
      };
    };
  };
}
