import { createContext } from 'react';

interface Props {
  sidebarOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  // Methods
  isOpenSidebar: VoidFunction;
  setIsAddingEntry: VoidFunction;
  setIsDragging: VoidFunction;
}

export const UIContext = createContext({} as Props);
