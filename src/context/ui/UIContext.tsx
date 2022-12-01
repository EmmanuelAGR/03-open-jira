import { createContext } from 'react';

interface Props {
  sidebarOpen: boolean;

  // Methods
  isOpenSidebar: VoidFunction;
}

export const UIContext = createContext({} as Props);
