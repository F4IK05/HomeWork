import React, { useContext } from "react";
import { SideBarContext } from '@/components/LeftSideBar'

const LeftSideBarItem: React.FC = ({ sectionName, icon, text, active }) => {
    const {isOpen} = useContext(SideBarContext)
    return (
        <>
            {sectionName && (<h4 className={`text-[#63676e] uppercase overflow-hidden transition-all ${isOpen ? 'w-32' : 'w-0 h-0'}`}>{sectionName}</h4>)}
            <li className={`
            flex 
            items-center 
            ${isOpen ? '' : 'justify-center'}
            cursor-pointer 
            py-2
            px-2
            rounded-md
            transition-colors ${active ? 'bg-[#4B5563] text-white' : 'text-gray-400 hover:bg-[#2c2c2e]'
                }`
            }>
                {icon}
                <span className={`overflow-hidden transition-all ${isOpen ? 'w-32 ml-3' : 'w-0 h-0'}`}>{text}</span>
            </li>

        </>
    )
}

export default LeftSideBarItem;