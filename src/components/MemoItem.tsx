import MiOptionsVertical from '../assets/MiOptionsVertical.svg'
import DropdownMenu from './DropdownMenu'

export default function MemoItem(props: { title: string, content: string, onClick: () => void, onDelete: () => void }) {
    const menuItems = [
        { label: 'Duplicate', action: 'duplicate' },
        { label: 'Delete', action: 'delete', isDestructive: true }
    ];
    const handleOptionSelect = (action: string) => {
        console.log(`${action} clicked for:`, props.title);
        if (action === 'delete') {
            props.onDelete();
        }
    };


    return (
        <div class="bg-gray-800 rounded-md p-4 m-2 cursor-pointer hover:bg-gray-700 transition-colors relative" onClick={props.onClick}>
            <div class="flex justify-between items-center mb-2">
                <h1 
                    class="text-white overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2 relative group"
                    title={props.title || 'Untitled'}
                >
                    {props.title || 'Untitled'}
                    <span class="absolute bottom-full left-0 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap z-10">
                        {props.title || 'Untitled'}
                    </span>
                </h1>
                <DropdownMenu
                    trigger={
                        <button 
                            class="p-1 hover:bg-gray-600 rounded transition-colors"
                            aria-label="Options"
                        >
                            <img src={MiOptionsVertical} alt="Options" class="w-5 h-5 brightness-0 invert cursor-pointer" />
                        </button>
                    }
                    items={menuItems}
                    onItemSelect={handleOptionSelect}
                />
            </div>
            <p class="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">{props.content || 'No content'}</p>
        </div>
    )
}