
export type AppState = {
    currentMemo: Memo | null;
    memos: Memo[];
    memosNumber: number;
}

export type Memo = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export type MemoContextValue = {
    state: AppState;
}