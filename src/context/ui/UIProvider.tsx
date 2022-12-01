import { useReducer } from 'react';

import { UIContext, uiReducer } from './';

interface Props {
  children: React.ReactNode;
}

export interface UIState {
  sidebarOpen: boolean;
}

const INITIAL_STATE: UIState = {
  sidebarOpen: false,
};

export const UIProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  // Methods
  const isOpenSidebar = (): void => state.sidebarOpen ? dispatch({ type: 'UI - Close Sidebar' }) : dispatch({ type: 'UI - Open Sidebar' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        isOpenSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
