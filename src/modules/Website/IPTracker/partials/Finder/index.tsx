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
      className="col-span-4 md:col-span-2 order-3 md:order-2"
      onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <input
            id="client"
            className="form-input w-full disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
            type="text"
            placeholder="Buscar dirección IP"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
}
