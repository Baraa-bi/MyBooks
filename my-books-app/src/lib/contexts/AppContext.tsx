import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

enum Constants {
  SET_IS_LOADING,
  SET_MODAL_INFO,
  SET_API_TOKEN,
}

interface ModalInfo {
  title?: string;
  text?: string;
  animation: any;
  buttonTitle: string;
  onPress: () => void;
}

interface IState {
  isLoading: boolean;
  modalInfo: ModalInfo | null;
  apiToken: string | null;
}

interface IActions {
  setIsLoading: (payload: boolean) => void;
  setModalInfo: (payload: ModalInfo | null) => void;
  setApiToken: (payload: string | null) => void;
}

const initState: IState = {
  isLoading: false,
  modalInfo: null,
  apiToken: null,
};

const ValueContext = createContext<IState>(initState);
const ActionsContext = createContext<IActions | null>(null);

export const useAppContextValue = () => {
  return useContext(ValueContext);
};

export const useAppContextActions = () => {
  const actions = useContext(ActionsContext);
  if (!actions) {
    throw new Error(
      "useAppContextActions must be used within AppContextProvider"
    );
  }
  return actions;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setIsLoading = useCallback((payload: boolean) => {
    return dispatch({ type: Constants.SET_IS_LOADING, payload });
  }, []);

  const setModalInfo = useCallback((payload: ModalInfo | null) => {
    return dispatch({ type: Constants.SET_MODAL_INFO, payload });
  }, []);

  const setApiToken = useCallback((payload: string | null) => {
    return dispatch({ type: Constants.SET_API_TOKEN, payload });
  }, []);

  const contextValue: IState = useMemo(() => {
    return state;
  }, [state]);

  const contextActions: IActions = useMemo(() => {
    return { setIsLoading, setModalInfo, setApiToken };
  }, [setIsLoading, setModalInfo, setApiToken]);

  return (
    <ValueContext.Provider value={contextValue}>
      <ActionsContext.Provider value={contextActions}>
        {children}
      </ActionsContext.Provider>
    </ValueContext.Provider>
  );
};

interface ISetIsLoadingAction {
  type: Constants.SET_IS_LOADING;
  payload: boolean;
}

interface ISetModalInfoAction {
  type: Constants.SET_MODAL_INFO;
  payload: ModalInfo | null;
}

interface ISetApiTokenAction {
  type: Constants.SET_API_TOKEN;
  payload: string | null;
}

type ActionTypes =
  | ISetIsLoadingAction
  | ISetModalInfoAction
  | ISetApiTokenAction;

const reducer = (state: IState, action: ActionTypes): IState => {
  switch (action.type) {
    case Constants.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case Constants.SET_MODAL_INFO:
      return { ...state, modalInfo: action.payload };
    case Constants.SET_API_TOKEN:
      return { ...state, apiToken: action.payload };
    default:
      return state;
  }
};
