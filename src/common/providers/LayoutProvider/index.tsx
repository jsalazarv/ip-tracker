import { createContext, useContext, useState } from 'react';

export interface LayoutContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const LayoutContext = createContext<LayoutContextProps>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};
