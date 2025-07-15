import React, { useContext } from "react";
import { SideBarContext } from '@/contexts/SideBarContext'
import MyToolTip from "./Tooltip";

interface TooltipProps {
    sectionName?: string;
    icon?: React.ReactNode;
    text: string;
    active?: boolean;
}

const LeftSideBarItem: React.FC<TooltipProps> = ({ sectionName, icon, text, active }) => {
    const { isOpen } = useContext(SideBarContext)

    const content = (
        <li className={`
            flex 
            items-center 
            ${isOpen ? '' : 'justify-center'}
            cursor-pointer 
            py-2
            px-2
            rounded-md
            transition-colors ${active ? 'bg-[#4B5563] text-white' : 'hover:bg-[#2c2c2e]'
            }`
        }>
            {icon}
            <span className={`overflow-hidden whitespace-nowrap transition-all ${isOpen ? 'ml-3' : 'w-0 h-0 opacity-0'}`}>{text}</span>
        </li>
    );
    return (
        <>
            {sectionName && (
                <h4 className={`mt-5 text-[#63676e] cursor-default uppercase overflow-hidden transition-all w-32 h-[20px] ${isOpen ? '' : 'opacity-0'}`}>
                    {sectionName}
                </h4>
            )}

            {isOpen ? content : (
                <MyToolTip children={content} side="right" hint={text}/>
            )}

        </>
    )
}

export default LeftSideBarItem;