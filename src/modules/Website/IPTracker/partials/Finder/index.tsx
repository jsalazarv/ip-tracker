import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface FinderProps {
  onSearch: (ip: string) => void;
}

export default function Finder({ onSearch }: FinderProps) {
  const { t } = useTranslation();
  const [ipAddress, setIpAddress] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ipAddress.trim()) {
      onSearch(ipAddress.trim());
    }
  };

  return (
    <form
      className="col-span-4 md:col-span-2 order-3 md:order-2 w-full"
      onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="relative">
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500 transition-colors">
            <svg
              className="h-5 w-5 text-slate-400 hover:text-blue-500 transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            id="client"
            className="form-input w-full text-sm rounded-lg pr-10 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-blue-500"
            type="text"
            placeholder={t('ipTracker.finder.placeholder')}
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
      </div>
    </form>
  );
}
