import MemoItem from "./MemoItem";
import { getMockMemos } from "../mock";
import { Memo } from "../types";
import { createResource, For, createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAppContext } from "../Provider";
import MaterialSymbolsAdd from "../assets/MaterialSymbolsAdd2.svg";

export default function HomeComponent() {
    console.log("Home: Component is rendering!");

    const { state, updateMemos, addMemo, setCurrentMemo } = useAppContext();
    const [memosResource] = createResource(getMockMemos);
    const navigate = useNavigate();
    const [hasLoaded, setHasLoaded] = createSignal(false);

    createEffect(() => {
        const memos = memosResource();
        if (memos && memos.length > 0 && !hasLoaded() && state.memos.length === 0) {
            console.log("Home: calling updateMemos (first load)");
            updateMemos(memos);
            setHasLoaded(true);
        }
    });

    const handleMemoClick = (memo: Memo) => {
        const memoCopy = { ...memo };
        setCurrentMemo(memoCopy);
        navigate(`/memo/${memo.id}`);
    }

    const handleAddMemo = async () => {
        console.log("Home: handleAddMemo called");
        
        const newMemo = await addMemo({
            title: "",
            content: "",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        if (newMemo) {
            console.log("Home: New memo created with ID:", newMemo.id);
            setCurrentMemo({ ...newMemo });
            navigate(`/memo/${newMemo.id}`);
        } else {
            console.error("Home: Failed to create memo");
        }
    }

    return (
        <div class="p-4 overflow-y-auto relative">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <For each={state.memos}>{(memo) => (
                    <MemoItem title={memo.title} content={memo.content} onClick={() => handleMemoClick(memo)} />
                )}</For>
            </div>
            
            <button 
                class="fixed bottom-6 right-6 w-16 h-16 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
                aria-label="Add new memo"
                onClick={handleAddMemo}
            >
                <img src={MaterialSymbolsAdd} alt="Add" class="w-10 h-10 brightness-0 invert" />
            </button>
        </div>
    )
}


