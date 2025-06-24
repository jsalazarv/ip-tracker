import ThemeToggle from '@common/components/ThemeToggle';
import Accordion from '@common/components/Accordion';
import Map from './partials/Map';
import Finder from './partials/Finder';
import { useIP } from '@common/hooks/api/useIP';
import { useState } from 'react';

export default function IPTracker() {
  const { getIP } = useIP();
  const [searchIP, setSearchIP] = useState<string>();

  const handleSearch = (ip: string) => {
    setSearchIP(ip);
  };

  const { data, error } = getIP(searchIP);
  const coordinates = data?.data?.location;
  const ip = data?.data?.ip;

  const ips = [
    {
      title: '192.168.1.1',
      text: 'Ubicación: Ciudad de México, México\nISP: Telmex\nZona Horaria: UTC-6\nDominio: router.local',
      active: false,
    },
    {
      title: '8.8.8.8',
      text: 'Ubicación: Mountain View, California, USA\nISP: Google LLC\nZona Horaria: UTC-7\nDominio: dns.google',
      active: false,
    },
    {
      title: '104.26.10.229',
      text: 'Ubicación: San Francisco, California, USA\nISP: Cloudflare, Inc.\nZona Horaria: UTC-7\nDominio: cloudflare.com',
      active: false,
    },
    {
      title: '157.240.22.35',
      text: 'Ubicación: Dublin, Irlanda\nISP: Facebook, Inc.\nZona Horaria: UTC+1\nDominio: facebook.com',
      active: false,
    },
    {
      title: '13.33.141.38',
      text: 'Ubicación: Ashburn, Virginia, USA\nISP: Amazon Technologies Inc.\nZona Horaria: UTC-4\nDominio: aws.amazon.com',
      active: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 min-h-screen grid-rows-[auto_1fr]">
      <div className="col-span-2 p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-2 md:col-span-1 order-1 md:order-1">
            <div className="flex items-center h-full">
              <h1>IP Tracker</h1>
            </div>
          </div>
          <Finder onSearch={handleSearch} />
          <div className="col-span-2 md:col-span-1 order-2 md:order-3">
            <div className="flex items-center justify-end h-full">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 p-5 flex-1 lg:max-h-screen">
        <h2 className="text-lg font-semibold mb-5">IP List</h2>
        <div className="space-y-3">
          {ips.map((ip, index) => (
            <Accordion
              key={index}
              title={ip.title}
              id={`ip-${index}`}
              active={ip.active}>
              {ip.text}
            </Accordion>
          ))}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 bg-slate-900 flex-1 lg:rounded-l-[2rem] lg:max-h-screen overflow-hidden">
        <Map coordinates={coordinates} ip={ip} error={error?.message} />
      </div>
    </div>
  );
}
