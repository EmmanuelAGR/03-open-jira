import { UIState } from './';

type UIActionType =
  | { type: '[UI] - Open Sidebar', payload: boolean }
  | { type: '[UI] - Open AddEntry', payload: boolean }
  | { type: '[UI] - Open StartDragging', payload: boolean }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI] - Open Sidebar':
      return {
        ...state,
        sidebarOpen: action.payload,
      };

    case '[UI] - Open AddEntry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    
    case '[UI] - Open StartDragging':
      return {
        ...state,
        isDragging: action.payload,
      };
    
    default:
      return state;
  }
};
