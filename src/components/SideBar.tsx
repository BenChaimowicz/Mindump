import LongButton from "./LongButton";
import { useAppContext } from "../Provider";
import { createMemo } from "solid-js";

export default function SideBarComponent() {
    console.log("SideBar: Component is rendering!");
    
    const { state } = useAppContext();
    const memosCount = createMemo(() => {
        const count = state.memos.length;
        console.log("SideBar: memosCount:", count);
        return count;
    });
    
    return (
        <div class="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
            <div class="flex flex-col h-full">
                <div class="mb-6">
                    <h1 class="text-xl font-bold text-white">Mind-Dump</h1>
                    <p class="text-sm text-gray-400 mt-1">{memosCount()} items</p>
                </div>

                <nav class="flex-1">
                    <ul class="space-y-2">
                        <li class="flex">
                            <LongButton text="My Dump" href="/" onClick={() => { }} />
                        </li>
                        <li class="flex">
                            <LongButton text="Settings" href="/settings" onClick={() => { }} />
                        </li>
                    </ul>
                </nav>

                <div class="mt-auto pt-4 border-t border-gray-700">
                    <div class="text-sm text-gray-400">
                        © 2025 Mind-Dump
                    </div>
                </div>
            </div>
        </div>
    )
}
