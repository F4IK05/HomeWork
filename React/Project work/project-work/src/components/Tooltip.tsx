import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import type React from "react"

interface ItemsProps {
    chldren: React.ReactNode;
    hint: string;
}


const MyTooltip:React.FC<ItemsProps> = ({children, hint}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{hint}</p>
            </TooltipContent>
        </Tooltip>
    )
}