import LongButton from "./LongButton";


export default function SideBarComponent() {
    return (
        <div class="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
            <div class="flex flex-col h-full">
                <div class="mb-6">
                    <h1 class="text-xl font-bold text-white">Mind-Dump</h1>
                </div>
                
                <nav class="flex-1">
                    <ul class="space-y-2">
                        <li class="flex">
                            <LongButton text="My Dump" onClick={() => {}} />
                        </li>
                        <li class="flex">
                            <LongButton text="Settings" onClick={() => {}} />
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
