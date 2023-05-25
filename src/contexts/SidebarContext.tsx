import { ReactNode, createContext, useState } from 'react';
type SidebarContext = {
  sidebarToggle: any;
  currentTopic: string;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setCurrentTopic: (topic: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('' as string);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarToggle,
        currentTopic,
        toggleSidebar,
        closeSidebar,
        setCurrentTopic
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
