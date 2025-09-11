import React, { useCallback, useEffect, useState } from "react";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { SideBarProvider } from "@/contexts/SideBarContext";
import LayoutContent from "./LayoutContent";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Lock, X } from "lucide-react";

const Layout: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const { t } = useTranslation();

    const [isMobile, setIsMobile] = useState(false);
    const { userName, passwordSet } = useAuth();

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize]);

    useEffect(() => {
        const showToast = localStorage.getItem('showPasswordToast');

        if ((!passwordSet || !showToast) && userName) {

            toast.custom((tst) => (
                <div
                    className={`${tst.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
                        } max-w-md w-full bg-[#1f1f23] rounded-lg pointer-events-auto flex transform transition-all duration-300 ease-in-out`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-center">
                            <div className="">
                                <Lock size={24} className="text-gray-400" />
                            </div>
                            <div className="ml-3 flex-1">
                                
                                <p className="mt-1 text-sm text-gray-500">
                                    {t("link_password_start")}
                                    <Link to="/account#security" className="underline text-blue-400">
                                        {t("link_password_middle")}
                                    </Link>
                                    {t("link_password_end")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-700">
                        <button
                            onClick={() => toast.dismiss(tst.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
                        >
                            <X size={24} className="text-white"/>
                        </button>
                    </div>
                </div>
            ))
            // toast(t("link_password_reminder"), {
            //     icon: "🔒",
            //     className: "bg-blue-700 text-white font-semibold px-100"
            // });

            localStorage.setItem('showPasswordToast', 'true');
        }
    }, [passwordSet]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{
                style: {
                    background: '#1f1f23',
                    color: '#fff',
                    padding: '12px 16px',
                    borderRadius: '8px',
                }
            }} />
            <PlayerProvider>
                <SideBarProvider>
                    <LayoutContent isMobile={isMobile} currentLocation={currentLocation} />
                </SideBarProvider>
            </PlayerProvider>
        </>
    )
}

export default Layout;