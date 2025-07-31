import { ArrowRightToLine, Menu, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSideBar } from "@/hooks/useSideBar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    const { t } = useTranslation();

    const { isOpen, setIsOpen } = useSideBar();

    const [isMobile, setIsMobile] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    const handleResize = useCallback(() => {
        const mobileMode = window.innerWidth < 768;

        if (isMobile !== mobileMode) {
            setIsMobile(mobileMode);
            setIsInputOpen(!mobileMode);
            setIsModalOpen(false);
            // setIsSettingsModalOpen(false)
        }
    }, [isMobile]);

    useEffect(() => {

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {

            // Закрытие поля поиска при клике вне его
            if (isInputOpen && searchRef.current && !searchRef.current.contains(e.target as Node) && isMobile) {
                setIsInputOpen(false);
            }

            // Закрытие модального меню при клике вне него
            if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node) && isMobile) {
                setIsModalOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isInputOpen, isMobile, isModalOpen]);

    useEffect(() => {
        if (isInputOpen && isMobile) {
            inputRef.current?.focus();
        }
    }, [isInputOpen, isMobile]);

    return (
        <>
            <div
                className={`
                fixed top-0 right-0 z-30 h-16
                bg-[#1e1e22] text-white flex justify-between items-center p-4 
                transition-all gap-5 select-none
                ${isMobile ? 'left-0' : (isOpen ? 'left-64' : 'left-16')}
            `}>
                {isMobile &&
                    <div className="flex items-center">
                        <button onClick={() => setIsOpen(true)} className="cursor-pointer group">
                            <ArrowRightToLine strokeWidth={1} className="transition-all duration-300 rounded-lg text-white bg-[#171719] w-10 h-10 p-1.5" />
                        </button>
                    </div>
                }

                <div ref={searchRef} className="relative w-full flex items-center max-w-lg ">
                    <input type="text" placeholder={t("search") + "..."} ref={inputRef} className={`bg-[#171719] p-2 px-5 pl-10 rounded-full transition-all ${isInputOpen ? 'w-full opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'}`} />
                    <button onClick={() => isMobile && setIsInputOpen(val => !val)} className={`absolute left-1 rounded-full ${isMobile && 'cursor-pointer'} ${isMobile && !isInputOpen ? 'p-4' : ''} ${isInputOpen ? 'bg-[#1e1e22] p-2' : 'bg-[#171719]'}`}>
                        <Search className=" w-4 h-4" />
                    </button>
                </div>

                {!isMobile ? (

                    <div className="flex items-center gap-2">
                        {/* <MyToolTip children={
                            <button className="cursor-pointer relative group p-2 rounded hover:bg-[#2c2c2e] transition-all">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-2 right-2 flex items-center justify-center bg-red-600 w-2 h-2 rounded-full group-hover:animate-ping"></span>
                            </button>
                        } side="bottom" hint={t("notifications")} /> */}

                        <Link to="/sign_up" className="text-sm font-bold transition-all hover:text-gray-400 hover:scale-[1.04] active:scale-[0.95] p-1 tracking-wide text-nowrap cursor-pointer">{t("sign_up")}</Link>
                        <Link to="/sign_in" className="bg-white text-black rounded-full font-bold text-nowrap transition-all hover:scale-[1.04] active:scale-[0.95] p-2 px-5 cursor-pointer">{t("sign_in")}</Link>

                    </div>

                ) : (
                    <button onClick={() => setIsModalOpen(true)} className="cursor-pointer">
                        <Menu />
                    </button>
                )
                }
            </div>

            <div ref={modalRef} className={`fixed inset-0 bg-[#212124] z-9999 p-4 transform transition-all
                    ${isModalOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                <div className="flex items-center justify-end">
                    <button onClick={() => setIsModalOpen(false)} className="cursor-pointer">
                        <X className="w-7 h-7 text-white" />
                    </button>
                </div>

                <div className="flex flex-col items-start text-xl text-white font-semibold gap-5 mt-5">
                    <Link to="/sign_in" className="cursor-pointer">{t("sign_in")}</Link>
                    <Link to="/sign_up" className="cursor-pointer">{t("sign_up")}</Link>
                </div>

                <hr className="my-10 w-5"/>
            </div>
            `

        </>

    );
};

export default NavBar;
