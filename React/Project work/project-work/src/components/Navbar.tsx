import { Bell, ChevronDown, ChevronLast, ChevronRight, Menu, Search, Settings, User, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSideBar } from "@/contexts/SideBarContext";
import MyToolTip from "./Tooltip";
import { useTranslation } from "react-i18next";

const NavBar: React.FC = () => {
    const { i18n, t } = useTranslation();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const { isOpen, setIsOpen } = useSideBar();

    const [isMobile, setIsMobile] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    const settingsModalRef = useRef<HTMLDivElement>(null);

    const handleResize = useCallback(() => {
        const mobileMode = window.innerWidth < 768;

        if (isMobile !== mobileMode) {
            setIsMobile(mobileMode);
            setIsInputOpen(!mobileMode);
            setIsModalOpen(false);
            setIsSettingsModalOpen(false)
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

            // Закрытие модального окна при клике вне него
            if (isSettingsModalOpen && settingsModalRef.current && !settingsModalRef.current.contains(e.target as Node)) {
                setIsSettingsModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isInputOpen, isMobile, isModalOpen, isSettingsModalOpen]);

    useEffect(() => {
        if (isInputOpen) {
            inputRef.current?.focus();
        }
    }, [isInputOpen]);


    const openSettingsModal = () => {
        setIsSettingsModalOpen(true);
        setIsModalOpen(false); // Закрываем мобильное меню если оно открыто
    };

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
                            <ChevronLast className="w-10 h-10 transition-all duration-300 rounded-lg text-white bg-[#63676e] p-1.5" />
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

                    <div className="flex items-center gap-1">
                        <MyToolTip children={
                            <button onClick={openSettingsModal} className="cursor-pointer group p-2 rounded hover:bg-[#2c2c2e] transition-all">
                                <Settings className=" duration-300 ease-in group-hover:rotate-180 w-6 h-6 " />
                            </button>
                        } side="bottom" hint={t('settings')} />

                        <MyToolTip children={
                            <button className="cursor-pointer relative group p-2 rounded hover:bg-[#2c2c2e] transition-all">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-2 right-2 flex items-center justify-center bg-red-600 w-2 h-2 rounded-full group-hover:animate-ping"></span>
                            </button>
                        } side="bottom" hint={t("notifications")} />

                        <MyToolTip children={
                            <button className="bg-[#63676e] rounded-full p-2 cursor-pointer">
                                <User className="w-6 h-6" />
                            </button>
                        } side="bottom" hint={t("profile")} />

                    </div>

                ) : (
                    <button onClick={() => setIsModalOpen(true)} className="cursor-pointer">
                        <Menu />
                    </button>
                )
                }

                {isModalOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-[100]"></div>


                        <div ref={modalRef} className="fixed top-16 right-4 z-[110] bg-[#212124] rounded-md flex flex-col items-start gap-2 p-2 shadow-md">
                            <button onClick={openSettingsModal} className="w-full group p-2 rounded hover:bg-[#2c2c2e] transition-all flex justify-between items-center gap-2">
                                <Settings className="w-6 h-6 transition-all duration-300 ease-in group-hover:rotate-180" />
                                <span>{t('settings')}</span>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            <button className="w-full relative group p-2 rounded hover:bg-[#2c2c2e] transition-all flex justify-between items-center gap-2">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-2 left-5.5 bg-red-600 w-2 h-2 rounded-full group-hover:animate-ping"></span>
                                <span>{t("notifications")}</span>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            <button className="w-full p-2 rounded hover:bg-[#2c2c2e] flex justify-between items-center gap-2">
                                <User className="w-6 h-6" />
                                <span>{t("profile")}</span>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </>
                )}

                {isSettingsModalOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-10"></div>
                        <div ref={settingsModalRef} className="p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#212124] rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center border-b border-[#2c2c2e] pb-5">
                                <h2 className="text-xl font-semibold text-white">{t("settings")}</h2>
                                <button
                                    onClick={() => setIsSettingsModalOpen(false)}
                                    className="group p-1 rounded hover:bg-[#2c2c2e] transition-all"
                                >
                                    <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </button>
                            </div>

                            <div className="relative">
                                <h3 className="text-lg font-medium text-white">{t("language")}</h3>
                                <select onChange={handleLanguageChange} value={i18n.language} className="appearance-none w-full bg-[#171719] text-white p-2 rounded focus:outline-none cursor-pointer">
                                    <option value="en">English</option>
                                    <option value="ru">Русский</option>
                                </select>

                                <div className="absolute top-9 right-0 flex items-center px-2 text-white">
                                    <ChevronDown/>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>

    );
};

export default NavBar;
