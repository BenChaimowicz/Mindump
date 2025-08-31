import { LongButtonProps } from "../types";
import { A } from "@solidjs/router";

export default function LongButton(props: LongButtonProps) {
    if (props.href) {
        return (
            <A href={props.href} class="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors w-full cursor-pointer [&.active]:text-white [&.active]:bg-gray-700 [&.active]:shadow-[0_0_10px_rgba(255,255,255,0.3)]" onClick={props.onClick}>
                {props.text}
            </A>
        )
    }

    return (
        <button class="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors w-full cursor-pointer" onClick={props.onClick}>
            {props.text}
        </button>
    )
}