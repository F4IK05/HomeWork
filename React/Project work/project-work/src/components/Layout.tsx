import React, { useEffect, useState } from "react";
import LeftSideBar from "@/components/LeftSideBar"
import LeftSideBarItem from "@/components/LeftSideBarItem";
import { House, ListMusic, MicVocal, Music, Music3, Radio, TvMinimal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const [isOpen, setIsOpen] = useState(true);
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
            <div className="relative flex bg-[#171719] h-screen overflow-hidden">
                <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen}>
                    <LeftSideBarItem icon={<House />} text="Home" to='/' active={currentLocation === '/'}/>
                    <LeftSideBarItem icon={<Music3 />} text="Explore" to="/explore" active={currentLocation === '/explore'}/>
                    <LeftSideBarItem icon={<TvMinimal />} text="Videos" to="/videos" active={currentLocation === '/videos'}/>
                    <LeftSideBarItem sectionName="My collection" icon={<Radio />} text="Mixes and Ratio" to="/mixes_ratio" active={currentLocation === '/mixes_ratio'}/>
                    <LeftSideBarItem icon={<ListMusic />} text="Playlists" to="/playlists" active={currentLocation === '/playlists'}/>
                    <LeftSideBarItem icon={<Music />} text="Tracks" to="/tracks" active={currentLocation === '/tracks'}/>
                    <LeftSideBarItem icon={<MicVocal />} text="Artists" to="/artists" active={currentLocation === '/artists'}/>
                </LeftSideBar>

                <div className="flex flex-col flex-1 overflow-hidden">
                    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

                    <div
                        className={`
                        pt-16 p-4 transition-all flex-1 overflow-y-auto
                        ${!isMobile ? 'pb-[10%]' : 'pb-[20%]'}
                        ${isMobile ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-16')}
                        `}
                    >
                        <Outlet/> {/* Сюда будет вставлятся, напрмер, MainPage*/}
                    </div>
                    <Player isMobile={isMobile} isOpen={isOpen}/>
                </div>
            </div>
        </>
    )
}

export default Layout;