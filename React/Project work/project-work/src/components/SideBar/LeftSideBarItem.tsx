import React, { useEffect } from "react";
import { useSideBar } from '@/contexts/SideBarContext'
import MyToolTip from "../Tooltip";
import { Link, useLocation } from "react-router-dom";

interface TooltipProps {
    sectionName?: string;
    icon?: React.ReactNode;
    text: string;
    active?: boolean;
    to?: string;
}

const LeftSideBarItem: React.FC<TooltipProps> = ({ sectionName, icon, text, active, to = "#" }) => {
    const location = useLocation();
    const { isOpen, setIsOpen } = useSideBar()

    useEffect(() => {
        if (isOpen && window.innerWidth < 768) {
            setIsOpen(false) // закрытия sidebar-а при переходе по пути
        }
    }, [location.pathname]) 

    const content = (
        <Link to={to} className={`
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
        </Link>
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