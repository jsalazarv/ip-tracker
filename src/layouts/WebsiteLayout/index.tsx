import { Outlet } from 'react-router-dom';

export const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Outlet />
    </div>
  );
};
