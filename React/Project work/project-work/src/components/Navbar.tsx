import { Bell, ChevronLast, ChevronRight, Menu, Search, Settings, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const NavBar: React.FC<{ isOpen: boolean; setIsOpen }> = ({ isOpen, setIsOpen }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const modalRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const mobileMode = window.innerWidth < 768;

            if (isMobile !== mobileMode) {
                setIsMobile(mobileMode);
                setIsInputOpen(!mobileMode);
                setIsModalOpen(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, [isMobile]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isInputOpen && searchRef.current && !searchRef.current.contains(e.target as Node) && isMobile) {
                setIsInputOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isInputOpen, isMobile]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node) && isMobile) {
                setIsModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    })

    useEffect(() => {
        if (isInputOpen) {
            inputRef.current?.focus();
        }
    }, [isInputOpen]);

    return (
        <>
            <div
                className={`
                fixed top-0 right-0 z-30 h-16
                bg-[#1e1e22] text-white flex justify-between items-center p-4 
                transition-all gap-5
                ${isMobile ? 'left-0' : (isOpen ? 'left-64' : 'left-16')}
            `}
            >
                {isMobile &&
                    <div className="flex items-center">
                        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
                            <ChevronLast className="w-6 h-6 transition-all duration-300 rounded-lg text-white w-10 h-10 bg-[#63676e] p-1.5" />
                        </button>
                    </div>
                }

                <div ref={searchRef} className="relative w-full flex items-center max-w-lg ">
                    <input type="text" placeholder="Search..." ref={inputRef} className={`bg-[#171719] p-2 px-5 pl-10 rounded-full transition-all ${isInputOpen ? 'w-full opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'}`} />
                    <button onClick={() => { if (isMobile) setIsInputOpen(val => !val) }} className={`absolute left-1 rounded-full ${isMobile && 'cursor-pointer' } ${isMobile && !isInputOpen ? 'p-4' : ''} ${isInputOpen ? 'bg-[#1e1e22] p-2' : 'bg-[#171719]'}`}>
                        <Search className=" w-4 h-4" />
                    </button>
                </div>

                {!isMobile ? (

                    <div className="flex items-center gap-1">
                        <button className="group p-2 rounded hover:bg-[#2c2c2e] transition-all">
                            <Settings className="cursor-pointer duration-300 ease-in group-hover:rotate-180 w-6 h-6 " />
                        </button>
                        <button className="relative group p-2 rounded hover:bg-[#2c2c2e] transition-all">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 flex items-center justify-center bg-red-600 w-2 h-2 rounded-full group-hover:animate-ping"></span>
                        </button>
                        <button className="bg-[#63676e] rounded-full p-2 cursor-pointer">
                            <User className="w-6 h-6" />
                        </button>
                    </div>

                ) : (
                    <button ref={modalRef} onClick={() => setIsModalOpen(val => !val)} className="cursor-pointer">
                        <Menu />
                    </button>
                )
                }

                {isModalOpen && isMobile && (
                    <div className="fixed top-16 right-4 z-50 bg-[#212124] rounded-md flex flex-col items-start gap-2 p-2 shadow-md">
                        <button className="w-full group p-2 rounded hover:bg-[#2c2c2e] transition-all flex justify-between items-center gap-2">
                            <Settings className="w-6 h-6 transition-all duration-300 ease-in group-hover:rotate-180" />
                            <span>Settings</span>
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                        <button className="w-full relative group p-2 rounded hover:bg-[#2c2c2e] transition-all flex justify-between items-center gap-2">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 left-5.5 bg-red-600 w-2 h-2 rounded-full group-hover:animate-ping"></span>
                            <span>Notifications</span>
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                        <button className="w-full p-2 rounded hover:bg-[#2c2c2e] flex justify-between items-center gap-2">
                            <User className="w-6 h-6" />
                            <span>Profile</span>
                            <ChevronRight className="w-6 h-6 ml-"/>
                        </button>
                    </div>
                )}



            </div>
        </>

    );
};

export default NavBar;
