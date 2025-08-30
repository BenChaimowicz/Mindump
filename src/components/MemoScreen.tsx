import { createResource } from "solid-js";
import { getMemoById } from "../mock";
import { Memo } from "../types";

export default function MemoScreen(props: { memoId: string }) {
    const { memoId } = props;
    const [memo] = createResource(() => getMemoById(memoId));
    console.log(memo());
    return (
        <div>
            <h1>{memo().title}</h1>
            <p>{memo().content}</p>
        </div>
    )
}