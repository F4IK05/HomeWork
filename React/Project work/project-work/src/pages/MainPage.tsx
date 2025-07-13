import React, { useEffect, useState } from "react";
import LeftSideBar from "@/components/LeftSideBar"
import LeftSideBarItem from "@/components/LeftSideBarItem";
import { Disc3, House, ListMusic, MicVocal, Music, Music3, Radio, TvMinimal } from "lucide-react";
import Navbar from "@/components/Navbar";

const MainPage: React.FC = () => {
    // Исправить!!!!!
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
    // 

    return (
        <>
            <div className="relative flex bg-[#171719]">
                <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen}>
                    <LeftSideBarItem icon={<House />} text="Home" active />
                    <LeftSideBarItem icon={<Music3 />} text="Explore" />
                    <LeftSideBarItem icon={<TvMinimal />} text="Videos" />
                    <LeftSideBarItem sectionName="My collection" icon={<Radio />} text="Mixes and Ratio" />
                    <LeftSideBarItem icon={<ListMusic />} text="Playlists" />
                    <LeftSideBarItem icon={<Disc3 />} text="Albums" />
                    <LeftSideBarItem icon={<Music />} text="Tracks" />
                    <LeftSideBarItem icon={<MicVocal />} text="Artists" />

                    
                </LeftSideBar>

                <div className="flex flex-col flex-1">
                    <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>

                    <main
                        className={`
                        pt-16 p-4 transition-all h-1000
                        ${isMobile ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-16')}
                        
                    `}
                    >
тто
                    </main>
                </div>
            </div>

        </>
    )
}

export default MainPage;