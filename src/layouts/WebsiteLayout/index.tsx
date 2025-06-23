import { Outlet } from 'react-router-dom';

export const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="grow flex flex-col lg:flex-row">
        <main className="max-lg:grow flex flex-col w-full lg:w-1/2 lg:ml-auto">
          <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">
            <div className="fixed top-0 right-0 w-full lg:w-1/2 lg:px-6 z-50"></div>
            <div className="px-2 lg:px-6 lg:mt-28">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
