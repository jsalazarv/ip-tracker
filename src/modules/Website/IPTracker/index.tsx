import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIP } from '@common/hooks/api/useIP';
import Finder from './partials/Finder';
import Map from './partials/Map';
import IPInfo from './partials/IPInfo';
import IPHistory from './partials/IPHistory';
import ThemeToggle from '@common/components/ThemeToggle';
import LanguageToggle from '@common/components/LanguageToggle';

export default function IPTracker() {
  const { t } = useTranslation();
  const { getIP } = useIP();
  const [searchIP, setSearchIP] = useState<string>();
  const [finderKey, setFinderKey] = useState(0);
  const [showIPInfo, setShowIPInfo] = useState(false);
  const [centerOnUser, setCenterOnUser] = useState(false);
  const handleSearch = (ip: string) => {
    setSearchIP(ip);
    setShowIPInfo(true);
    setCenterOnUser(false);
  };

  const { data, error, isLoading } = getIP(searchIP);
  const coordinates = data?.data?.location;
  const ip = data?.data?.ip;

  const handleClose = () => {
    setSearchIP(undefined);
    setFinderKey((prev) => prev + 1);
    setShowIPInfo(false);
    setCenterOnUser(true);
  };

  const handleHistorySelect = (ip: string) => {
    setSearchIP(ip);
    setShowIPInfo(false);
    setCenterOnUser(false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="grow flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/5 flex flex-col mt-32">
          <div
            id="header"
            className="fixed w-[inherit] top-0 bg-white dark:bg-slate-950 z-10 p-5 border-b border-slate-200 dark:border-slate-900">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 flex-1">
                <h1 className="text-2xl font-bold">{t('ipTracker.title')}</h1>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div className="col-span-4">
                <Finder key={finderKey} onSearch={handleSearch} />
              </div>
            </div>
          </div>

          <div className="grow p-5 pt-6 overflow-y-auto">
            {showIPInfo && (
              <div className="mb-5">
                <IPInfo
                  data={data?.data}
                  isLoading={isLoading}
                  onClose={handleClose}
                />
              </div>
            )}

            <IPHistory onSelect={handleHistorySelect} />
          </div>
        </div>

        <div className="relative w-full lg:w-3/5 lg:fixed lg:right-0 lg:top-0 lg:bottom-0 min-h-[350px] overflow-hidden">
          <Map
            coordinates={coordinates}
            ip={ip}
            error={error?.message}
            centerOnUser={centerOnUser}
          />
        </div>
      </div>
    </div>
  );
}
