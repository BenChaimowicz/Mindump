import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { AppState } from "./types";


export const AppContext = createContext<{state: AppState, setState: any}>();

export function AppContextProvider(props) {
    const [state, setState] = createStore<AppState>({
        memosNumber: 0,
        currentMemo: null,
        memos: [],
    });
    return (
        <AppContext.Provider value={{state, setState}}>
            {props.children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
