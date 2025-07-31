import { ArrowRightToLine, AudioLines, ChevronDown, PanelLeft, Settings, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSideBar } from "@/hooks/useSideBar";
import MyToolTip from "../Tooltip";
import { useTranslation } from "react-i18next";
import { usePlayer } from "@/hooks/usePlayer";

interface SideBarProps {
    children: React.ReactNode;
}

const LeftSideBar: React.FC<SideBarProps> = ({ children }) => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const { currentSong } = usePlayer();

    const sideBarRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { isOpen, setIsOpen } = useSideBar();

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const settingsModalRef = useRef<HTMLDivElement>(null);

    const handleResize = useCallback(() => {
        setIsOpen(window.innerWidth >= 768);
        setIsMobile(window.innerWidth < 768);
    }, [setIsOpen]);

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]); // если заходят с телефонных размеров закрывать 


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Закрытие модального окна при клике вне него
            if (isSettingsModalOpen && settingsModalRef.current && !settingsModalRef.current.contains(e.target as Node)) {
                setIsSettingsModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSettingsModalOpen]);

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

    const openSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    return (
        <>
            {/* Затемнение фона */}
            {isOpen && isMobile && (
                <div className="fixed inset-0 bg-black/50 z-9999"></div>
            )}

            <div
                ref={sideBarRef}
                className={`
                    h-full transition-all fixed z-9998 text-gray-400 select-none
                    ${isOpen ? 'w-64' : 'w-16'}
                    ${!isOpen && isMobile ? 'opacity-0 -translate-x-full ' : 'translate-x-0 z-9999'}
                `}>
                <div className="h-full flex flex-col bg-[#212124] group">
                    <div className={`border-b border-[#63676e] p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
                        <h1 className={`flex items-center gap-1 text-xl font-semibold transition-all overflow-hidden pointer-events-none whitespace-nowrap ${isOpen ? '' : 'opacity-0'}`}>
                            <AudioLines />
                            <p>Music App</p>
                        </h1>
                        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer relative">
                            {isOpen ? (
                                <MyToolTip side="right" hint={t("close_sidebar")}>
                                    <div>
                                        <PanelLeft strokeWidth={1} className="hover:opacity-0 transition-all duration-300 rounded-lg text-white hover:text-white w-10 h-10 p-1.5" />
                                        <ArrowRightToLine strokeWidth={1} className={`absolute inset-0 transition-all duration-300 rounded-lg text-white opacity-0 hover:opacity-100 hover:bg-[#171719] w-10 h-10 p-1.5 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                    </div>
                                </MyToolTip>
                            ) : (
                                <MyToolTip side="right" hint={t("open_sidebar")}>
                                    <div>
                                        <AudioLines className="group-hover:opacity-0 transition-all duration-300 rounded-lg text-gray-400 hover:text-white w-10 h-10 p-1.5" />
                                        <ArrowRightToLine strokeWidth={1} className={`absolute inset-0 transition-all duration-300 rounded-lg text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#171719] w-10 h-10 p-1.5 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                    </div>
                                </MyToolTip>
                            )}

                        </button>
                    </div>

                    <ul className={`flex-1 m-2 overflow-x-hidden ${isOpen ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
                        {children}
                    </ul>

                    <div className={`p-2 border-t border-[#63676e] ${currentSong && !isMobile && 'mb-20'}`}>
                        {isOpen ? (
                            <button onClick={openSettingsModal} className={`cursor-pointer group p-2 rounded hover:bg-[#2c2c2e] transition-all w-full flex items-center gap-3 ${isSettingsModalOpen && 'text-white'}`}>
                                <Settings className="ease-in group-hover:rotate-180 w-6 h-6" />
                                <span className={`text-base font-semibold transition-all ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{t('settings')}</span>
                            </button>
                        ) : (
                            <MyToolTip side="right" hint={t('settings')}>
                                <button onClick={openSettingsModal} className="cursor-pointer group p-2 rounded hover:bg-[#2c2c2e] transition-all w-full flex items-center justify-center">
                                    <Settings className="ease-in group-hover:rotate-180 w-6 h-6" />
                                </button>
                            </MyToolTip>
                        )}
                    </div>


                </div>
            </div>

            {isSettingsModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-9999"></div>
                    <div ref={settingsModalRef} className="p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-9999 bg-[#212124] rounded-lg shadow-xl w-90">
                        <div className="flex justify-between items-center border-b border-[#2c2c2e] pb-5">
                            <h2 className="text-xl font-semibold text-white">{t("settings")}</h2>
                            <button
                                onClick={() => setIsSettingsModalOpen(false)}
                                className="group p-1 rounded hover:bg-[#2c2c2e] transition-all cursor-pointer"
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </button>
                        </div>

                        <div className="mt-1">
                            <h3 className="mb-2 text-lg font-medium text-white">{t("language")}</h3>
                            <div className="relative">
                                <select onChange={handleLanguageChange} value={i18n.language} className="appearance-none w-full bg-[#171719] text-white p-2 rounded focus:outline-none cursor-pointer">
                                    <option value="en">English</option>
                                    <option value="ru">Русский</option>
                                </select>

                                <div className="absolute bottom-2 right-0 flex items-center px-2 text-white pointer-events-none">
                                    <ChevronDown />
                                </div>
                            </div>


                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default LeftSideBar;