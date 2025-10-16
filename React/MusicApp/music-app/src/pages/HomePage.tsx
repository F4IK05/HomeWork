import React, { useEffect, useState } from "react";
import { Music, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePlayer } from "@/hooks/usePlayer";
import { songApi } from "@/api/songApi";
import type { SongData } from "@/types/SongData";
import MusicSection from "@/components/layout/global/music/MusicGrid";
import VerifyToast from "@/components/VerifyToast";

const HomePage: React.FC = () => {
  const { userName, userEmail, isEmailVerified } = useAuth();
  const { currentSong } = usePlayer();

  const [songs, setSongs] = useState<SongData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await songApi.getAll();
        setSongs(data);
      } catch (err) {
        console.error("Ошибка при загрузке песен:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
      {/* 🔔 Проверка email */}
      {!isEmailVerified && userEmail && <VerifyToast email={userEmail} />}

      {/* 👋 Приветствие */}
      <h1 className="text-3xl font-bold mb-6">
        {userName ? `Welcome back, ${userName}! 🎵` : "Welcome to MusicApp 🎧"}
      </h1>
      <p className="text-gray-400 mb-10">
        {userName
          ? "Continue listening to your favorite tracks or discover something new."
          : "Sign in to sync your playlists, favorites, and listening history."}
      </p>

      {/* 🎶 Популярные треки */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Music className="w-6 h-6 text-blue-400" />
          Trending Songs
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#2a2a2e] rounded-xl aspect-square" />
            ))}
          </div>
        ) : songs.length > 0 ? (
          <MusicSection sectionTitle="🔥 Trending Songs" />
        ) : (
          <p className="text-gray-400 italic">No songs available.</p>
        )}
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
