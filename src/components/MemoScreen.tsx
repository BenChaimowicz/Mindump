import { createMemo, createEffect, createSignal } from "solid-js";

import { Memo } from "../types";
import { useAppContext } from "../Provider";
import ArrowBack from "../assets/MaterialSymbolsArrowBackRounded.svg";
import { useNavigate } from "@solidjs/router";

export default function MemoScreen(props: { memoId: string }) {
    const { memoId } = props;
    const { state, updateMemo: updateMemoInProvider, deleteMemo } = useAppContext();
    const memo = createMemo(() => {
        console.log("Memo computed with:", { memoId, memosLength: state.memos.length, memoIds: state.memos.map(m => m.id) });
        const localMemo = state.memos.find(m => m.id === memoId);
        if (localMemo) {
            console.log("Found memo in local state:", localMemo);
            return localMemo;
        }
        console.log("Memo not found in local state");
        return null;
    });
    const navigate = useNavigate();

    const [title, setTitle] = createSignal("");
    const [content, setContent] = createSignal("");
    const [isChanged, setIsChanged] = createSignal(false);

    createEffect(() => {
        const currentMemo = memo();
        console.log("MemoScreen: createEffect called with", currentMemo);
        if (currentMemo) {
            setTitle(currentMemo.title);
            setContent(currentMemo.content);
        }
    });

    const updateMemo = (field: 'title' | 'content', value: string) => {
        const currentMemo = state.currentMemo;
        if (currentMemo) {
            updateMemoInProvider(currentMemo.id, {
                [field]: value,
                updatedAt: new Date()
            });
        }
    };

    const handleTitleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newTitle = target.value;
        setTitle(newTitle);
        updateMemo('title', newTitle);
        setIsChanged(true);
    };

    const handleContentChange = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        const newContent = target.value;
        setContent(newContent);
        updateMemo('content', newContent);
        setIsChanged(true);
    };

    const handleBack = () => {
        const shouldDelete = !isChanged() && !content() && !title();
        console.log("handleBack", shouldDelete, content(), title(), isChanged());
        console.log("Current memos in state:", state.memos.map(m => m.id));
        if (shouldDelete) {
            console.log("About to delete memo with ID:", state.currentMemo?.id);
            deleteMemo(state.currentMemo?.id);
        }
        navigate("/");
    }

    return (
        <div class="memo-screen">
            <div class="flex items-start gap-6 pt-6 pl-16 pr-8">
                <button
                    class="fixed top-6 left-6 w-16 h-16 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
                    aria-label="Go back"
                    onClick={handleBack}
                >
                    <img src={ArrowBack} alt="Back" class="w-10 h-10 brightness-0 invert" />
                </button>

                <div class="flex-1">
                    <textarea
                        value={title()}
                        onInput={handleTitleChange}
                        placeholder="Enter title..."
                        class="memo-title-input w-full text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none min-h-[3rem] leading-tight overflow-hidden"
                    />

                    <div class="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6 opacity-50"></div>

                    <textarea
                        value={content()}
                        onInput={handleContentChange}
                        placeholder="Enter content..."
                        class="memo-content-input w-full bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none text-lg leading-relaxed"
                        style="height: calc(100vh - 10rem);"
                    />
                </div>
            </div>
        </div>
    )
}