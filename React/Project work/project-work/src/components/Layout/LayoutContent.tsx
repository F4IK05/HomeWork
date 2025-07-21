import LeftSideBar from "@/components/SideBar/LeftSideBar"
import LeftSideBarItem from "@/components/SideBar/LeftSideBarItem";
import { House, ListMusic, MicVocal, Music, Music3, Radio, TvMinimal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { useSideBar } from "@/contexts/SideBarContext";
import { Outlet } from "react-router-dom";

interface LayoutContentProps {
    isMobile: boolean;
    currentLocation: string;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ isMobile, currentLocation }) => {
    const { isOpen } = useSideBar();
    
    return (
        <div className="relative flex bg-[#171719] h-screen overflow-hidden">
            <LeftSideBar>
                <LeftSideBarItem icon={<House />} text="Home" to='/' active={currentLocation === '/'} />
                <LeftSideBarItem icon={<Music3 />} text="Explore" to="/explore" active={currentLocation === '/explore'} />
                <LeftSideBarItem icon={<TvMinimal />} text="Videos" to="/videos" active={currentLocation === '/videos'} />
                <LeftSideBarItem sectionName="My collection" icon={<Radio />} text="Mixes and Ratio" to="/mixes_ratio" active={currentLocation === '/mixes_ratio'} />
                <LeftSideBarItem icon={<ListMusic />} text="Playlists" to="/playlists" active={currentLocation === '/playlists'} />
                <LeftSideBarItem icon={<Music />} text="Tracks" to="/tracks" active={currentLocation === '/tracks'} />
                <LeftSideBarItem icon={<MicVocal />} text="Artists" to="/artists" active={currentLocation === '/artists'} />
            </LeftSideBar>

            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />

                <div
                    className={`
                                pt-16 p-4 transition-all flex-1 overflow-y-auto
                                ${!isMobile ? 'pb-[10%]' : 'pb-[20%]'}
                                ${isMobile ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-16')}
                                `}
                >
                    <Outlet /> {/* Сюда будет вставлятся, напрмер, MainPage*/}
                </div>
                <Player isMobile={isMobile} isOpen={isOpen} />
            </div>
        </div>
    )
}

export default LayoutContent;