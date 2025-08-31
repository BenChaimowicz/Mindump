
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
}



export type LongButtonProps = {
    text: string;
    shortText?: string;
    onClick: () => void;
    href?: string;
    disabled?: boolean;
}