import { createMemo, createEffect, createSignal, Show, createResource } from "solid-js";
import { useAppContext } from "../Provider";
import ArrowBack from "../assets/MaterialSymbolsArrowBackRounded.svg";
import ArrowUp from '../assets/MaterialSymbolsArrowDropUp.svg';
import ArrowDown from '../assets/MaterialSymbolsArrowDropDown.svg';
import { useNavigate } from "@solidjs/router";
import { getMemoById } from "../mock";

export default function MemoScreen(props: { memoId: string }) {
    const { memoId } = props;
    const { state, updateMemo: updateMemoInProvider, deleteMemo } = useAppContext();
    const [selectedText, setSelectedText] = createSignal("");
    const [isSelectedText, setIsSelectedText] = createSignal(false);

    // Create a resource to fetch the memo if not found in state
    const [memoResource] = createResource(
        () => {
            // Only fetch if memo is not in state
            const localMemo = state.memos.find(m => m.id === memoId);
            return localMemo ? null : memoId;
        },
        getMemoById
    );

    const memo = createMemo(() => {
        console.log("Memo computed with:", { memoId, memosLength: state.memos.length, memoIds: state.memos.map(m => m.id) });
        
        // First check if memo is in local state
        const localMemo = state.memos.find(m => m.id === memoId);
        if (localMemo) {
            console.log("Found memo in local state:", localMemo);
            return localMemo;
        }
        
        // If not in local state, check if we have it from the resource
        const fetchedMemo = memoResource();
        if (fetchedMemo) {
            console.log("Found memo from resource:", fetchedMemo);
            return fetchedMemo;
        }
        
        console.log("Memo not found in local state or resource");
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
        const currentMemo = memo();
        if (currentMemo) {
            updateMemoInProvider(currentMemo.id, {
                [field]: value,
                updatedAt: new Date()
            });
        }
    };

    const handleTextSelection = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        const selectedText = target.value.substring(target.selectionStart, target.selectionEnd);
        if (selectedText?.trim() !== "") {
            setSelectedText(selectedText);
            setIsSelectedText(true);
        } else {
            setSelectedText("");
            setIsSelectedText(false);
        }
    }

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
            const currentMemo = memo();
            console.log("About to delete memo with ID:", currentMemo?.id);
            if (currentMemo) {
                deleteMemo(currentMemo.id);
            }
        }
        navigate("/");
    }

    return (
        <div class="memo-screen">

            <div class="flex items-start gap-6 pt-6 pl-8 pr-8">
                <div class="flex-1">
                    <div class="flex items-center gap-4 mb-6">
                        <button
                            class="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer flex-shrink-0"
                            aria-label="Go back"
                            onClick={handleBack}
                        >
                            <img src={ArrowBack} alt="Back" class="w-6 h-6 brightness-0 invert" />
                        </button>
                        <textarea
                            value={title()}
                            onInput={handleTitleChange}
                            placeholder="Enter title..."
                            class="memo-title-input flex-1 text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none h-12 leading-tight overflow-hidden flex items-center"
                        />
                    </div>

                    <div class="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6 opacity-50"></div>

                    <textarea
                        value={content()}
                        onInput={handleContentChange}
                        onMouseUp={handleTextSelection}
                        placeholder="Enter content..."
                        class="memo-content-input w-full bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none text-lg leading-relaxed"
                        style="height: calc(100vh - 10rem);"
                    />
                </div>
            </div>

            {/* Floating buttons on the right edge of sidebar */}
            <Show when={isSelectedText()}>
                <div class="fixed left-16 sm:left-48 md:left-58 top-1/5 transform -translate-y-1/2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-1 flex flex-col gap-1 z-50">
                    <button class="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center justify-center text-sm transition-colors">
                        <img src={ArrowUp} alt="Up" class="w-4 h-4 brightness-0 invert" />
                    </button>
                    <button class="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center justify-center text-sm transition-colors">
                        <img src={ArrowDown} alt="Down" class="w-4 h-4 brightness-0 invert" />
                    </button>
                </div>
            </Show>
        </div>
    )
}