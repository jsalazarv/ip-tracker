import { useState } from 'react';
import { useIPRecords } from '@common/hooks/api/useIPRecords';
import Accordion from '@common/components/Accordion';

export default function IPHistory() {
  const { records, isLoading: isLoadingRecords, deleteRecord } = useIPRecords();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter((record) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.ip.toLowerCase().includes(searchLower) ||
      record.city.toLowerCase().includes(searchLower) ||
      record.country.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Historial de IPs</h2>
        <input
          type="text"
          placeholder="Buscar IP, ciudad o país..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input w-48 text-sm"
        />
      </div>
      {isLoadingRecords ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <Accordion key={record.id} id={record.id} title={record.ip}>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Ubicación:</span>{' '}
                  {record.flag_emoji} {record.city}, {record.country}
                </p>
                <p>
                  <span className="font-medium">ISP:</span> {record.isp}
                </p>
                <p>
                  <span className="font-medium">Tipo:</span> {record.type}
                </p>
                {record.is_threat && (
                  <p className="text-red-500">
                    ⚠️ Esta IP ha sido marcada como amenaza
                  </p>
                )}
                <div className="pt-2">
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium">
                    Eliminar registro
                  </button>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 text-center py-8">
          {searchTerm
            ? 'No se encontraron registros que coincidan con la búsqueda'
            : 'No hay registros guardados aún'}
        </p>
      )}
    </div>
  );
}
