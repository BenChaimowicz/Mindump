import { createResource, createEffect, createSignal } from "solid-js";
import { getMemoById } from "../mock";
import { Memo } from "../types";
import { useAppContext } from "../Provider";

export default function MemoScreen(props: { memoId: string }) {
    const { memoId } = props;
    const { state, setCurrentMemo, updateMemos } = useAppContext();
    const [memo] = createResource(memoId, getMemoById);
    
    const [title, setTitle] = createSignal("");
    const [content, setContent] = createSignal("");

    createEffect(() => {
        const currentMemo = memo();
        if (currentMemo) {
            setCurrentMemo(currentMemo);
            setTitle(currentMemo.title);
            setContent(currentMemo.content);
        }
    });

    const updateMemo = (field: 'title' | 'content', value: string) => {
        const currentMemo = state.currentMemo;
        if (currentMemo) {
            const updatedMemo: Memo = {
                ...currentMemo,
                [field]: value,
                updatedAt: new Date()
            };
            setCurrentMemo(updatedMemo);

            const updatedMemos = state.memos.map(m => 
                m.id === currentMemo.id ? updatedMemo : m
            );
            updateMemos(updatedMemos);
        }
    };

    const handleTitleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newTitle = target.value;
        setTitle(newTitle);
        updateMemo('title', newTitle);
    };

    const handleContentChange = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        const newContent = target.value;
        setContent(newContent);
        updateMemo('content', newContent);
    };

    return (
        <div class="memo-screen p-6 max-w-4xl mx-auto">
            <input
                type="text"
                value={title()}
                onInput={handleTitleChange}
                placeholder="Enter title..."
                class="memo-title-input w-full text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
            
            <div class="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6 opacity-50"></div>
            
            <textarea
                value={content()}
                onInput={handleContentChange}
                placeholder="Enter content..."
                class="memo-content-input w-full h-96 bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none text-lg leading-relaxed"
            />
        </div>
    )
}