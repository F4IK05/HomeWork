import React, { useEffect, useState } from "react";
import LeftSideBar from "@/components/LeftSideBar"
import LeftSideBarItem from "@/components/LeftSideBarItem";
import { Disc3, House, ListMusic, MicVocal, Music, Music3, Radio, TvMinimal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
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
                    <LeftSideBarItem icon={<House />} text="Home" />
                    <LeftSideBarItem icon={<Music3 />} text="Explore" />
                    <LeftSideBarItem icon={<TvMinimal />} text="Videos" />
                    <LeftSideBarItem sectionName="My collection" icon={<Radio />} text="Mixes and Ratio" />
                    <LeftSideBarItem icon={<ListMusic />} text="Playlists" />
                    <LeftSideBarItem icon={<Disc3 />} text="Albums" />
                    <LeftSideBarItem icon={<Music />} text="Tracks" />
                    <LeftSideBarItem icon={<MicVocal />} text="Artists" />
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