import React, { useEffect, useState, useRef, useCallback } from "react";
import { Home, Library, Settings, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSideBar } from "@/hooks/useSideBar";
import { useTranslation } from "react-i18next";

const SideBar: React.FC = () => {
    const { isOpen, setIsOpen } = useSideBar();
    const { t } = useTranslation();
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleResize = useCallback(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);

        if (mobile) {
            // На мобильных — закрываем
            setIsOpen(false);
        } else {
            // На ПК — всегда открыт
            setIsOpen(true);
        }
    }, [setIsOpen]);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && isMobile && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, isMobile, setIsOpen]);

    useEffect(() => {
            if (isOpen && isMobile) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
    
            return () => {
                document.body.style.overflow = "";
            };
        }, [isMobile, isOpen]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Затемнение при открытом меню на мобильных */}
            {isOpen && isMobile && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`
                    fixed top-0 left-0 h-full bg-[#1b1b1f] text-white z-50
                    transition-all ease-in-out
                    ${isOpen ? "w-64" : "w-16"}
                    ${isOpen && isMobile && "z-20"}
                    ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
                `}
            >
                {/* Header */}
                <div className={`flex items-center border-b border-[#2a2a2e] p-4 transition-all duration-300 ${isOpen ? "justify-between" : "justify-center"
                    }`}>
                    <h1
                        className={`text-lg font-semibold tracking-wide overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                            }`}
                    >
                        MusicApp
                    </h1>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-300 hover:text-white transition cursor-pointer"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Навигация */}
                <nav className="flex flex-col p-2 mt-2 gap-2">
                    {[
                        { to: "/", icon: <Home className="w-5 h-5" />, label: t("home") },
                        { to: "/library", icon: <Library className="w-5 h-5" />, label: t("library") },
                        { to: "/settings", icon: <Settings className="w-5 h-5" />, label: t("settings") },
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => isMobile && setIsOpen(false)}
                            className={`
                                group flex items-center rounded-lg transition-all
                                ${isActive(item.to) ? "bg-[#28282d] text-white" : "text-gray-300 hover:bg-[#222226]"}
                                ${isOpen ? "justify-start gap-3 p-2" : "justify-center p-3 max-h-[50px]"}
                            `}
                        >
                            {item.icon}
                            <span
                                className={`
                                    text-sm font-medium overflow-hidden transition-all duration-300 ease-in-out
                                    ${isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}
                                `}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

            </aside>
        </>
    );
};

export default SideBar;
