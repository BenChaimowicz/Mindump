import MiOptionsVertical from '../assets/MiOptionsVertical.svg'

export default function MemoItem(props: { title: string, content: string, onClick: () => void }) {
    const handleOptionsClick = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the main onClick
        // Add your options logic here
        console.log('Options clicked');
    };

    return (
        <div class="bg-gray-800 rounded-md p-4 m-2 cursor-pointer hover:bg-gray-700 transition-colors" onClick={props.onClick}>
            <div class="flex justify-between items-center mb-2">
                <h1 class="text-white">{props.title || 'Untitled'}</h1>
                <button 
                    onClick={handleOptionsClick}
                    class="p-1 hover:bg-gray-600 rounded transition-colors"
                    aria-label="Options"
                >
                    <img src={MiOptionsVertical} alt="Options" class="w-5 h-5 brightness-0 invert cursor-pointer" />
                </button>
            </div>
            <p class="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">{props.content || 'No content'}</p>
        </div>
    )
}