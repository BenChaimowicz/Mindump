import { createSignal, onCleanup, Show, JSX, createEffect } from 'solid-js'

interface DropdownMenuItem {
    label: string;
    action: string;
    isDestructive?: boolean;
}

interface DropdownMenuProps {
    trigger: JSX.Element;
    items: DropdownMenuItem[];
    onItemSelect: (action: string) => void;
    class?: string;
}

export default function DropdownMenu(props: DropdownMenuProps) {
    const [isOpen, setIsOpen] = createSignal(false);
    
    const handleTriggerClick = (e: MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen());
    };

    const handleItemClick = (action: string, e: MouseEvent) => {
        e.stopPropagation();
        props.onItemSelect(action);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
        if (!(e.target as Element).closest('.dropdown-container')) {
            setIsOpen(false);
        }
    };

    createEffect(() => {
        if (typeof window === 'undefined') return;
        
        if (isOpen()) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        onCleanup(() => {
            document.removeEventListener('click', handleClickOutside);
        });
    });

    return (
        <div class={`dropdown-container relative ${props.class || ''}`}>
            <div onClick={handleTriggerClick}>
                {props.trigger}
            </div>
            
            <Show when={isOpen()}>
                <div class="absolute right-0 top-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-20 min-w-[140px]">
                    <div class="py-1">
                        {props.items.map((item, index) => (
                            <>
                                <button
                                    onClick={(e) => handleItemClick(item.action, e)}
                                    class={`w-full text-left px-4 py-2 transition-colors text-sm ${
                                        item.isDestructive 
                                            ? 'text-red-400 hover:text-red-300 hover:bg-gray-600' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-600'
                                    }`}
                                >
                                    {item.label}
                                </button>
                                {index < props.items.length - 1 && !item.isDestructive && 
                                 props.items[index + 1]?.isDestructive && (
                                    <div class="border-t border-gray-600 my-1"></div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </Show>
        </div>
    );
}
