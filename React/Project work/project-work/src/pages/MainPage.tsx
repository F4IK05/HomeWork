import React from "react";
import MusicSection from "@/components/MusicSection";
import AlbumSection from "@/components/AlbumSection";

const MainPage: React.FC = () => {
    return (
        <>

            <MusicSection
                sectionTitle="New Arrivals"
                cards={[
                    {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    },
                    {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    },
                    {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    },
                    {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    }, {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    },
                    {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    },
                    {
                        title: "My New Arrivals",
                        subtitle: "Deine Freunde, Moderat, Sebastián Yatra",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                    },

                ]}
            />

            
            <AlbumSection
                sectionTitle="Albums"
                albums={[
                    {
                        albumName: "My New Arrivals",
                        albumDesc: "Deine Freunde, Moderat, Sebastián Yatra",
                        albumImgUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                        albumId: 0,
                    },
                    {
                        albumName: "My New Arrivals",
                        albumDesc: "Deine Freunde, Moderat, Sebastián Yatra",
                        albumImgUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
                        albumId: 1,
                    },

                ]}
            />



        </>
    )
}

export default MainPage;