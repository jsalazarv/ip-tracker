import ThemeToggle from '@common/components/ThemeToggle';
import Accordion from '@common/components/Accordion';

export default function IPTracker() {
  return (
    <div className="grid grid-cols-2 min-h-screen grid-rows-[auto_1fr]">
      <div className="col-span-2 p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-2 md:col-span-1 order-1 md:order-1">
            <div className="flex items-center h-full">
              <h1>IP Tracker</h1>
            </div>
          </div>
          <form className="col-span-4 md:col-span-2 order-3 md:order-2">
            <div className="space-y-4">
              <div>
                <input
                  id="client"
                  className="form-input w-full disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
                  type="text"
                  placeholder="Buscar dirección IP"
                  required
                />
              </div>
            </div>
          </form>
          <div className="col-span-2 md:col-span-1 order-2 md:order-3">
            <div className="flex items-center justify-end h-full">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 p-5 flex-1">
        <h2 className="text-lg font-semibold mb-5">IP List</h2>
      </div>
      <div className="col-span-2 md:col-span-1 bg-blue-400 p-5 flex-1 lg:rounded-l-[2rem]">
        <h2 className="text-lg font-semibold mb-5">IP Map</h2>
      </div>
    </div>
  );
}
