import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIPRecords } from '@common/hooks/api/useIPRecords';
import Accordion from '@common/components/Accordion';
import { EmptyState } from '@common/components/EmptyState';

interface IPHistoryProps {
  onSelect: (ip: string) => void;
}

export default function IPHistory({ onSelect }: IPHistoryProps) {
  const { t } = useTranslation();
  const { records, isLoading: isLoadingRecords, deleteRecord } = useIPRecords();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const sortedRecords = [...records].sort((a, b) => b.id.localeCompare(a.id));
  const filteredRecords = sortedRecords.filter((record) => {
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
        <h2 className="text-lg font-semibold">
          {t('ipTracker.history.title')}
        </h2>
        <input
          type="text"
          placeholder={t('ipTracker.history.filterPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input w-48 text-sm rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      {isLoadingRecords ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-black/5">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <Accordion
              key={record.id}
              id={record.id}
              title={record.ip}
              location={{
                city: record.city,
                country: record.country,
                flag_emoji: record.flag_emoji,
                latitude: record.latitude,
                longitude: record.longitude,
              }}
              onClick={() => {
                onSelect(record.ip);
                setActiveAccordion(record.id);
              }}
              active={activeAccordion === record.id}
              className="bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-slate-800/80 dark:to-slate-900 rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t('ipTracker.history.details.type')}:
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {record.type}
                  </p>

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t('ipTracker.history.details.isp')}:
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {record.isp}
                  </p>
                </div>

                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t('ipTracker.history.details.countryCode')}:
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {record.country_code}
                  </p>

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t('ipTracker.history.details.coordinates')}:
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    lat: {record.latitude.toFixed(2)}° / lon:{' '}
                    {record.longitude.toFixed(2)}°
                  </p>
                </div>
              </div>

              {record.is_threat && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {t('ipTracker.history.threatWarning')}
                  </p>
                </div>
              )}

              <div className="w-full grid grid-cols-4 gap-4 mt-4">
                <button
                  onClick={() => deleteRecord(record.id)}
                  className="col-span-2 col-start-3 btn w-full text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900 border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 shadow shadow-black/5 hover:bg-red-400 hover:text-white dark:hover:bg-red-500 dark:hover:text-white">
                  {t('ipTracker.history.deleteRecord')}
                </button>
              </div>
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="p-6 w-full h-full flex items-center justify-center">
          <EmptyState
            title={
              searchTerm
                ? t('ipTracker.history.empty.noResults')
                : t('ipTracker.history.empty.noRecords')
            }
            subtitle={t('ipTracker.history.empty.subtitle')}
          />
        </div>
      )}
    </div>
  );
}
