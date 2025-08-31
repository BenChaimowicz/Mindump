import { createContext, JSX, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { AppState, Memo } from "./types";

export const AppContext = createContext<AppContextValue>();

type AppContextValue = {
    state: AppState;
    setState: any;
    updateMemos: (memos: Memo[]) => void;
    setCurrentMemo: (memo: Memo) => void;
    addMemo: (memo: Memo) => void;
}

export function AppContextProvider(props: { children: JSX.Element }) {
    console.log("Provider: Initializing AppContextProvider");
    const [state, setState] = createStore<AppState>({
        currentMemo: null,
        memos: [],
    });
    
    console.log("Provider: Initial state created, memos.length:", state.memos.length);
    
    const updateMemos = (memos: Memo[]) => {
        console.log("Provider: updateMemos called with", memos.length, "memos");
        setState('memos', memos);
    };
    const setCurrentMemo = (memo: Memo) => {
        setState('currentMemo', memo);
    };
    const addMemo = (memo: Memo) => {
        setState('memos', [...state.memos, memo]);
    };

    return (
        <AppContext.Provider value={{ state, setState, updateMemos, setCurrentMemo, addMemo }}>
            {props.children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        console.error("useAppContext: Context not found! Make sure AppContextProvider is wrapping your component.");
        throw new Error("useAppContext must be used within AppContextProvider");
    }
    return context;
}