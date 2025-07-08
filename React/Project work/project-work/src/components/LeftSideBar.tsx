import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import React, { createContext, useState } from "react";
import { UserIcon } from '@heroicons/react/24/solid';

export const SideBarContext = createContext();

const LeftSideBar: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="h-screen text-white">
            <div className="h-full flex flex-col bg-[#212124]">
                <div className="border-b border-[#63676e] p-4 flex justify-end items-center">
                    <button onClick={() => setIsOpen((val) => !val)} className="cursor-pointer">
                        {isOpen ? <ChevronFirst className="rounded-lg w-10 h-10 bg-[#63676e] p-1.5"/>
                        : <ChevronLast className="rounded-lg w-10 h-10 bg-[#63676e] p-1.5"/>}
                    </button>
                </div>
                
                <SideBarContext.Provider value={{isOpen}}>
                    <ul className="flex-1 m-2">
                        {children}
                    </ul>
                </SideBarContext.Provider>


                <div className="border-t border-[#63676e] flex items-center p-2">
                    <UserIcon className="w-12 h-12 p-2 bg-[#63676e] text-white rounded-[50%]"/>
                    <div className={`overflow-hidden transition-all ${isOpen ? 'w-32 ml-3' : 'w-0'}`}>
                        <div>
                            <p>Name</p>
                            <p>example.com</p>
                        </div>
            
                    </div>
                    <MoreVertical className={`overflow-hidden transition-all ${isOpen ? 'ml-3' : 'w-0'}`}/>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;