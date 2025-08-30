import MemoItem from "./MemoItem";
import { getMockMemos } from "../mock";
import { Memo } from "../types";
import { createResource, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAppContext } from "../Provider";


export default function HomeComponent() {

    const {state} = useAppContext();
    const [memos, {mutate}] = createResource(getMockMemos);
    const navigate = useNavigate();

    const handleMemoClick = (memo: Memo) => {
        navigate(`/memo/${memo.id}`);
    }

    return (
        <div class="p-4 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <For each={memos()}>{(memo) => (
                    <MemoItem title={memo.title} content={memo.content} onClick={() => handleMemoClick(memo)}/>
                )}</For>
            </div>
        </div>
    )
}


