
export type AppState = {
    currentMemo: Memo | null;
    memos: Memo[];
}

export type Memo = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    category?: MemoCategory;
    categoryId?: string;
}

export type MemoCategory = {
    id: string;
    name: string;
    color: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
