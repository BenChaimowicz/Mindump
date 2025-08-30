

export default function LongButton(props: { text: string, onClick: () => void }) {

    return (
        <button class="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors w-full cursor-pointer" onClick={props.onClick}>
            {props.text}
        </button>
    )
}