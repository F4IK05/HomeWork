import React from "react";
import MusicSection from "@/components/Music/MusicSection";
import AlbumSection from "@/components/Album/AlbumSection";
import songs from "@/assets/data/SongData";
import albums from "@/assets/data/AlbumData";
import { useTranslation } from "react-i18next";

const MainPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>

            <MusicSection
                sectionTitle={t("new_arrivals")}
                cards={songs}
            />


            <AlbumSection
                sectionTitle={t("albums")}
                albums={albums}
            />



        </>
    )
}

export default MainPage;