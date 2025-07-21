import React from "react";
import MusicSection from "@/components/Music/MusicSection";
import AlbumSection from "@/components/Album/AlbumSection";
import songs from "@/assets/data/SongData";
import albums from "@/assets/data/AlbumData";

const MainPage: React.FC = () => {

    return (
        <>

            <MusicSection
                sectionTitle="New Arrivals"
                cards={songs}
            />

            
            <AlbumSection
                sectionTitle="Albums"
                albums={albums}
            />



        </>
    )
}

export default MainPage;