import React from "react";
import { Music, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePlayer } from "@/hooks/usePlayer";
import songs from "@/assets/data/SongData"; // 🎵 твои реальные песни
import MusicGrid from "@/components/layout/music/MusicGrid";
import VerifyToast from "@/components/VerifyToast";

const HomePage: React.FC = () => {
    const { userName, userEmail, isEmailVerified } = useAuth();
    const { currentSong } = usePlayer();

    return (
        <div className="text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">

            {!isEmailVerified && userEmail && <VerifyToast email={userEmail} />}
            {/* Приветствие */}
            <h1 className="text-3xl font-bold mb-6">
                {userName ? `Welcome back, ${userName}! 🎵` : "Welcome to MusicApp 🎧"}
            </h1>
            <p className="text-gray-400 mb-10">
                {userName
                    ? "Continue listening to your favorite tracks or discover something new."
                    : "Sign in to sync your playlists, favorites, and listening history."}
            </p>

            {/* Раздел популярных песен */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Music className="w-6 h-6 text-blue-400" />
                    Trending Songs
                </h2>

                <MusicGrid
                    cards={songs.slice(0, 10)}
                    sectionTitle="🔥 Trending Songs"
                />
            </section>

            {/* ❤️ Избранное */}
            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-pink-400" />
                    Your Favorites
                </h2>

                <div className="bg-[#1b1b1f] rounded-xl p-6 text-gray-400 flex items-center justify-center h-40">
                    {userName ? (
                        <p>
                            {currentSong
                                ? `Currently playing: ${currentSong.title} by ${currentSong.artist}`
                                : "No favorites yet. Start adding songs you love!"}
                        </p>
                    ) : (
                        <p>Sign in to see your favorite songs ❤️</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
