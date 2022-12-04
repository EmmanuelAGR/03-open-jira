import { useReducer } from 'react';

import { UIContext, uiReducer } from './';

interface Props {
  children: React.ReactNode;
}

export interface UIState {
  sidebarOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const INITIAL_STATE: UIState = {
  sidebarOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  // Methods
  const isOpenSidebar = (): void => state.sidebarOpen ? dispatch({ type: '[UI] - Open Sidebar', payload: false }) : dispatch({ type: '[UI] - Open Sidebar', payload: true });
  const setIsAddingEntry = (): void => state.isAddingEntry ? dispatch({ type: '[UI] - Open AddEntry', payload: false }) : dispatch({ type: '[UI] - Open AddEntry', payload: true });
  const setIsDragging = (): void => state.isDragging ? dispatch({ type: '[UI] - Open StartDragging', payload: false }) : dispatch({ type: '[UI] - Open StartDragging', payload: true });

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        isOpenSidebar,
        setIsAddingEntry,
        setIsDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
