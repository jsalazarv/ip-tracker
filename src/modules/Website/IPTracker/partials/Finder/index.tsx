import { FormEvent, useState } from 'react';

interface FinderProps {
  onSearch: (ip: string) => void;
}

export default function Finder({ onSearch }: FinderProps) {
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
        <div>
          <input
            id="client"
            className="form-input w-full text-sm rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-blue-500"
            type="text"
            placeholder="Buscar dirección IP"
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
