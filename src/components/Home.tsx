import MemoItem from "./MemoItem";
import { getMockMemos } from "../mock";
import { Memo } from "../types";
import { createResource, For, createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAppContext } from "../Provider";

export default function HomeComponent() {
    console.log("Home: Component is rendering!");

    const { state, updateMemos } = useAppContext();
    const [memosResource] = createResource(getMockMemos);
    const navigate = useNavigate();
    const [hasLoaded, setHasLoaded] = createSignal(false);

    createEffect(() => {
        const memos = memosResource();
        console.log("Home: createEffect running, memos:", memos?.length, "loading:", memosResource.loading);

        // Only update once when data first loads
        if (memos && memos.length > 0 && !hasLoaded()) {
            console.log("Home: calling updateMemos (first load)");
            updateMemos(memos);
            setHasLoaded(true);
        }
    });

    const handleMemoClick = (memo: Memo) => {
        navigate(`/memo/${memo.id}`);
    }

    return (
        <div class="p-4 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <For each={state.memos}>{(memo) => (
                    <MemoItem title={memo.title} content={memo.content} onClick={() => handleMemoClick(memo)} />
                )}</For>
            </div>
        </div>
    )
}


