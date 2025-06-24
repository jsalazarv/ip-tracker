import { useState } from 'react';
import { useIP } from '@common/hooks/api/useIP';
import Finder from './partials/Finder';
import Map from './partials/Map';
import IPInfo from './partials/IPInfo';
import IPHistory from './partials/IPHistory';
import ThemeToggle from '@common/components/ThemeToggle';

export default function IPTracker() {
  const { getIP } = useIP();
  const [searchIP, setSearchIP] = useState<string>();
  const [finderKey, setFinderKey] = useState(0);
  const handleSearch = (ip: string) => {
    setSearchIP(ip);
  };

  const { data, error, isLoading } = getIP(searchIP);
  const coordinates = data?.data?.location;
  const ip = data?.data?.ip;

  const handleClose = () => {
    setSearchIP(undefined);
    setFinderKey((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-2 min-h-screen grid-rows-[auto_1fr]">
      <div className="col-span-2 p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-2 md:col-span-1 order-1 md:order-1">
            <div className="flex items-center h-full">
              <h1>IP Tracker</h1>
            </div>
          </div>
          <Finder key={finderKey} onSearch={handleSearch} />
          <div className="col-span-2 md:col-span-1 order-2 md:order-3">
            <div className="flex items-center justify-end h-full">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 p-5 flex-1 lg:max-h-screen">
        <div className="mb-5">
          <IPInfo
            data={data?.data}
            isLoading={isLoading}
            onClose={handleClose}
          />
        </div>

        <IPHistory />
      </div>
      <div className="col-span-2 md:col-span-1 bg-slate-900 flex-1 lg:rounded-l-[2rem] min-h-[350px] lg:max-h-screen overflow-hidden">
        <Map coordinates={coordinates} ip={ip} error={error?.message} />
      </div>
    </div>
  );
}
