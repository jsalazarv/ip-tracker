import { useIPRecords } from '@common/hooks/api/useIPRecords';

interface IPInfoProps {
  data?: {
    ip: string;
    type: string;
    location: {
      latitude: number;
      longitude: number;
    };
    city: {
      name: string;
    };
    country: {
      name: string;
      code: string;
      flag: {
        emoji: string;
      };
    };
    asn: {
      organisation: string;
    };
    security: {
      is_tor: boolean;
      is_proxy: boolean;
      is_threat: boolean;
    };
  };
  isLoading?: boolean;
  onClose?: () => void;
}

export default function IPInfo({ data, isLoading, onClose }: IPInfoProps) {
  const { saveRecord } = useIPRecords();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">IP Information</h2>
      <div className="bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-slate-800/80 dark:to-slate-900 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              IP Address:
            </span>
            <p className="font-medium text-sm">{data.ip}</p>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              IP Type:
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {data.type}
            </p>
          </div>

          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Location:
            </span>
            <p className="font-medium text-sm flex items-center gap-2">
              <span>{data.country.flag.emoji}</span>
              <span>{[data.city.name, data.country.name].join(', ')}</span>
            </p>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Country Code:
            </span>
            <p className="font-medium text-sm text-slate-600 dark:text-slate-300">
              {data.country.code}
            </p>
          </div>

          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Provider (ISP):
            </span>
            <p className="font-medium text-sm">{data.asn.organisation}</p>
          </div>

          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Coordinates:
            </span>
            <p className="font-medium text-sm">
              lat: {data.location.latitude.toFixed(2)}° / lon:{' '}
              {data.location.longitude.toFixed(2)}°
            </p>
          </div>
        </div>

        {(data.security.is_tor ||
          data.security.is_proxy ||
          data.security.is_threat) && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <span className="text-sm font-medium text-red-800 dark:text-red-300">
              ⚠️ Amenazas Detectadas:
              {data.security.is_tor && ' TOR'}
              {data.security.is_proxy && ' Proxy'}
              {data.security.is_threat && ' Threat'}
            </span>
          </div>
        )}

        <div className="w-full grid grid-cols-2 gap-4 mt-4">
          <div className="col-start-1 md:col-start-2 col-span-2 flex w-full justify-end gap-4">
            <button
              onClick={onClose}
              className="btn w-full text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900 border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 shadow shadow-black/5 hover:bg-red-400 hover:text-white dark:hover:bg-red-500 dark:hover:text-white">
              Descartar
            </button>
            <button
              onClick={() => data && saveRecord(data)}
              disabled={!data}
              className="btn w-full text-white bg-blue-500 hover:bg-blue-600 shadow shadow-black/5 animate-shine bg-[linear-gradient(100deg,theme(colors.blue.500),45%,theme(colors.blue.400),55%,theme(colors.blue.500))] bg-[size:200%_100%] hover:bg-[image:none] disabled:opacity-50 disabled:cursor-not-allowed">
              Agregar a la lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
