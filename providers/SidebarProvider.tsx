import { createContext, useContext, useState } from "react";
const SidebarContext = createContext({
  isSidebarOpen: false,
  handleSidebarToggle: () => {},
});
export function useSidebar() {
  return useContext(SidebarContext);
}
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, handleSidebarToggle }}>
      {children}
    </SidebarContext.Provider>
  );
}
