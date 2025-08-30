import MemoItem from "./MemoItem";
import { getMockMemos } from "../mock";
import { Memo } from "../types";
import { createSignal, createResource, For } from "solid-js";


export default function HomeComponent() {

    const [memos, {mutate}] = createResource(getMockMemos);

    const handleMemoClick = (memo: Memo) => {
        console.log(memo);
    }

    return (
        <div class="p-4 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={memos()}>{(memo) => (
                    <MemoItem title={memo.title} content={memo.content} onClick={() => handleMemoClick(memo)}/>
                )}</For>
            </div>
        </div>
    )
}


