import { createContext, JSX, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { AppState, Memo } from "./types";
import { createMemoDump } from "./mock";

export const AppContext = createContext<AppContextValue>();

type AppContextValue = {
    state: AppState;
    setState: any;
    updateMemos: (memos: Memo[]) => void;
    setCurrentMemo: (memo: Memo) => void;
    addMemo: (memo: Omit<Memo, 'id'>) => Promise<Memo | undefined>;
    deleteMemo: (id: string) => void;
    updateMemo: (id: string, updates: Partial<Memo>) => void;
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
        console.log("Provider: After update, memos:", state.memos.map(m => m.id));
    };
    const setCurrentMemo = (memo: Memo) => {
        console.log("Provider: setCurrentMemo called with", memo);
        setState('currentMemo', memo);
    };

    const addMemo = async (memoData: Omit<Memo, 'id'>) => {
        try {
            console.log("Provider: addMemo called with", memoData);
            
            const newMemo = await createMemoDump(memoData);
            console.log("Provider: createMemoDump returned:", newMemo);

            setState('memos', produce((m: Memo[]) => {
                m.push(newMemo);
            }));
            
            console.log("Provider: After addition, memos:", state.memos.map(m => m.id));
            return newMemo;
        } catch (error) {
            console.error('Failed to create memo:', error);
        }
    };
    // const addMemo = (memo: Omit<Memo, 'id'>) => {
    //     console.log("Provider: addMemo called with", memo);
    //     setState('memos', produce((m: Memo[]) => {
    //         const newId = (m.length + 1).toString();
    //         m.push({
    //             ...memo,
    //             id: newId
    //         });
    //     }));
    //     console.log("Provider: After addition, memos:", state.memos.map(m => m.id));
    // };
    const deleteMemo = (id: string) => {
        console.log("Provider: deleteMemo called with", id);
        console.log("Provider: Before deletion, memos:", state.memos.map(m => m.id));
        setState('memos', memos => {
            const filtered = memos.filter(memo => memo.id !== id);
            console.log("Provider: After filtering, memos:", filtered.map(m => m.id));
            return filtered;
        });
    };

    const updateMemo = (id: string, updates: Partial<Memo>) => {
        console.log("Provider: updateMemo called with", id, updates);
        setState('memos', produce((memos: Memo[]) => {
            const memoIndex = memos.findIndex(m => m.id === id);
            if (memoIndex !== -1) {
                memos[memoIndex] = { ...memos[memoIndex], ...updates };
            }
        }));

        // Also update currentMemo if it's the one being updated
        if (state.currentMemo && state.currentMemo.id === id) {
            setState('currentMemo', { ...state.currentMemo, ...updates });
        }
    };

    return (
        <AppContext.Provider value={{ state, setState, updateMemos, setCurrentMemo, addMemo, deleteMemo, updateMemo }}>
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