import { ChevronFirst, ChevronLast, Settings } from "lucide-react";
import React, { createContext, useState } from "react";
import { UserIcon } from '@heroicons/react/24/solid';

export const SideBarContext = createContext();

const LeftSideBar: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="h-screen text-white sm:text-lg md:text-base lg:text-sm">
            <div className="h-full flex flex-col bg-[#212124]">
                <div className={`border-b border-[#63676e] p-4 flex ${isOpen ? 'justify-end' : 'justify-center'} items-center`}>
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


                <div className="border-t border-[#63676e] flex justify-center items-center p-2">
                    
                    <UserIcon className="w-12 h-12 p-2 bg-[#63676e] text-white rounded-[50%]"/>
                    
                    <div className={`cursor-pointer hover:bg-gray-400 hover:rounded p-1 overflow-hidden transition-all ${isOpen ? 'w-32 ml-3' : 'w-0 hidden'}`}>
                        <div>
                            <p>Name</p>
                            <p>example.com</p>
                        </div>
            
                    </div>
                    <Settings className={`cursor-pointer hover:outline rounded-[50%] w-5 h-5 overflow-hidden transition-all ${isOpen ? '' : 'w-0 hidden'}`}/>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;