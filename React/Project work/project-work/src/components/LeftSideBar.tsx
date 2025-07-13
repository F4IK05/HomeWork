import { ChevronFirst } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SideBarContext } from "@/contexts/SideBarContext";
// import { UserIcon } from '@heroicons/react/24/solid';

const LeftSideBar: React.FC<{ children: React.ReactNode; isOpen: boolean; setIsOpen: (val: boolean) => void }> = ({ children, isOpen, setIsOpen }) => {
    const sideBarRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const hadleResize = () => {
            setIsOpen(window.innerWidth >= 768);
            setIsMobile(window.innerWidth < 768);
        };

        hadleResize()

        window.addEventListener("resize", hadleResize);

        return () => window.removeEventListener("resize", hadleResize);
    }, [setIsOpen]); // если заходят с телефонных размеров закрывать 

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && sideBarRef.current && !sideBarRef.current.contains(e.target as Node) && isMobile) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobile, isOpen, setIsOpen])

    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isOpen, isMobile])

    return (
        <>
            {/* Затемнение фона */}
            {isOpen && isMobile && (
                <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            )}

            <div
                ref={sideBarRef}
                className={`
                    h-screen transition-all fixed z-50 text-gray-400
                    ${isOpen ? 'w-64' : 'w-16'}
                    ${!isOpen && isMobile ? 'opacity-0 -translate-x-full' : 'translate-x-0'}
                `}>
                <div className="h-full flex flex-col bg-[#212124]">
                    <div className={`border-b border-[#63676e] p-4 flex ${isOpen ? 'justify-between' : 'justify-center'} items-center`}>
                        <h1 className={`text-xl font-semibold transition-all overflow-hidden whitespace-nowrap ${isOpen ? '' : 'opacity-0'}`}>Music App</h1>
                        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                            <ChevronFirst className={`transition-all duration-300 rounded-lg text-white w-10 h-10 bg-[#63676e] p-1.5 ${isOpen ? '' : 'rotate-180'}`} />
                        </button>
                    </div>

                    <SideBarContext.Provider value={{ isOpen }}>
                        <ul className={`flex-1 m-2 overflow-x-hidden ${isOpen ? 'overflow-y-auto' : 'overflow-y-hidden'} sidebar-scrollbar`}>
                            {children}
                        </ul>
                    </SideBarContext.Provider>


                    {/* <div className="border-t border-[#63676e] flex justify-center items-center p-2">
                        
                        
                        {!isOpen && (
                            <Settings className="cursor-pointer hover:rotate-180 transition-all" />
                        )}

                        
                        {isOpen && (
                            <>
                                <div className="transition-all w-32 ml-2">
                                    <p>Settings</p>
                                </div>
                                <Settings className="cursor-pointer hover:rotate-180 w-6 h-6 transition-all" />
                            </>
                        )}
                    </div> */}

                </div>
            </div>


        </>
    )
}

export default LeftSideBar;