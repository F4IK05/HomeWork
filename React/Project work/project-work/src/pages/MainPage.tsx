import React from "react";
import LeftSideBar from "@/components/LeftSideBar"
import LeftSideBarItem from "@/components/LeftSideBarItem";
import { Disc3 ,ListMusic, MicVocal, Music, Radio } from "lucide-react";


const MainPage: React.FC = () => {
    return (
        <div className="flex bg-[#171719]">
            <LeftSideBar>
                <LeftSideBarItem sectionName="My collection" icon={<Radio/>} text="Mixes and Ratio" active/>
                <LeftSideBarItem icon={<ListMusic/>} text="Playlists"/>
                <LeftSideBarItem icon={<Disc3/>} text="Albums"/>
                <LeftSideBarItem icon={<Music/>} text="Tracks"/>
                <LeftSideBarItem icon={<MicVocal />} text="Artists"/>

            </LeftSideBar>
        </div>
    )
}

export default MainPage;