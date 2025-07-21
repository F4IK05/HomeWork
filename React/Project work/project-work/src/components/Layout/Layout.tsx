import React, { useEffect, useState } from "react";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { SideBarProvider } from "@/contexts/SideBarContext";
import LayoutContent from "./LayoutContent";
import { useLocation } from "react-router-dom";

const Layout: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <PlayerProvider>
                <SideBarProvider>
                    <LayoutContent isMobile={isMobile} currentLocation={currentLocation} />
                </SideBarProvider>
            </PlayerProvider>
        </>
    )
}

export default Layout;