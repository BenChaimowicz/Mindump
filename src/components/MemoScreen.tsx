import { createResource, createEffect } from "solid-js";
import { getMemoById } from "../mock";
import { Memo } from "../types";
import { useAppContext } from "../Provider";

export default function MemoScreen(props: { memoId: string }) {
    const { memoId } = props;
    const { state, setCurrentMemo } = useAppContext();
    const [memo] = createResource(memoId, getMemoById);

    // Update current memo in store when memo loads
    createEffect(() => {
        const currentMemo = memo();
        if (currentMemo) {
            setCurrentMemo(currentMemo);
        }
    });

    return (
        <div>
            <h1>{memo()?.title || 'Untitled'}</h1>
            <p>{memo()?.content || 'No content'}</p>
        </div>
    )
}