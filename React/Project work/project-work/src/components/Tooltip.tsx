import type React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ItemsProps {
    children: React.ReactNode;
    hint: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}

const MyToolTip: React.FC<ItemsProps> = ({ children, hint, side }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className="bg-[#212124] z-9999 select-none">
                <p>{hint}</p>
            </TooltipContent>
        </Tooltip>
    )
};

export default MyToolTip;