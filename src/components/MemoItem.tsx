

export default function MemoItem(props: { title: string, content: string, onClick: () => void }) {
    return (
        <div class="bg-gray-800 rounded-md p-4 m-2 cursor-pointer hover:bg-gray-700 transition-colors" onClick={props.onClick}>
            <h1 class="text-white">{props.title || 'Untitled'}</h1>
            <p class="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">{props.content || 'No content'}</p>
        </div>
    )
}