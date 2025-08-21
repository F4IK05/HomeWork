import LeftSideBar from "@/components/SideBar/LeftSideBar"
import LeftSideBarItem from "@/components/SideBar/LeftSideBarItem";
import { House, ListMusic, MicVocal, Music, Music3, Radio, TvMinimal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { useSideBar } from "@/hooks/useSideBar";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

interface LayoutContentProps {
    isMobile: boolean;
    currentLocation: string;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ isMobile, currentLocation }) => {
    const { t } = useTranslation();
    const { isOpen } = useSideBar();

    const { userName, isEmailVerified } = useAuth();

    const userEmail = localStorage.getItem("userEmail")

    console.log(userEmail);

    return (
        <div className="relative flex bg-[#171719] h-screen overflow-hidden">
            <LeftSideBar>
                <LeftSideBarItem icon={<House />} text={t("home")} to='/' active={currentLocation === '/'} />
                <LeftSideBarItem icon={<Music3 />} text={t("explore")} to="/explore" active={currentLocation === '/explore'} />
                <LeftSideBarItem icon={<TvMinimal />} text={t("videos")} to="/videos" active={currentLocation === '/videos'} />
                <LeftSideBarItem sectionName={t("my_collection")} icon={<Radio />} text={t("mixes_ratio")} to="/mixes_ratio" active={currentLocation === '/mixes_ratio'} />
                <LeftSideBarItem icon={<ListMusic />} text={t("playlists")} to="/playlists" active={currentLocation === '/playlists'} />
                <LeftSideBarItem icon={<Music />} text={t("tracks")} to="/tracks" active={currentLocation === '/tracks'} />
                <LeftSideBarItem icon={<MicVocal />} text={t("artists")} to="/artists" active={currentLocation === '/artists'} />
            </LeftSideBar>

            <div className="flex flex-1 overflow-hidden">
                <Navbar />

                <div
                    className={`
                                pt-16 transition-all flex-1 overflow-y-auto
                                ${!isMobile ? 'pb-[10%]' : 'pb-[20%]'}
                                ${isMobile ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-16')}
                                `}
                >

                    {!isEmailVerified && userName && (
                        <div className=" p-4 bg-red-500/20 text-red-400 flex items-center gap-2">
                            <span>{t("please_verify_your_email")}</span>
                            <Link to="/verify-email" state={{ email: userEmail }} className="underline text-blue-400">
                                {t("verify_now")}
                            </Link>
                        </div>
                    )}
                    <div className="p-4">
                        <Outlet /> {/* Сюда будет вставлятся, напрмер, MainPage*/}

                    </div>
                </div>
                <Player isMobile={isMobile} />
            </div>
        </div>
    )
}

export default LayoutContent;