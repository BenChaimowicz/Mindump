import { A } from "@solidjs/router";

export type LongButtonProps = {
    text: string;
    shortText?: string;
    onClick: () => void;
    href?: string;
    disabled?: boolean;
}

export default function LongButton(props: LongButtonProps) {
    const displayText = () => {
        if (props.shortText) {
            return (
                <>
                    <span class="sm:hidden">{props.shortText}</span>
                    <span class="hidden sm:inline">{props.text}</span>
                </>
            );
        }
        return props.text;
    };

    if (props.href) {
        return (
            <A href={props.href} class="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors w-full cursor-pointer [&.active]:text-white [&.active]:bg-gray-700 [&.active]:shadow-[0_0_10px_rgba(255,255,255,0.3)]" onClick={props.onClick}>
                {displayText()}
            </A>
        )
    }

    return (
        <button class="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors w-full cursor-pointer" onClick={props.onClick}>
            {displayText()}
        </button>
    )
}