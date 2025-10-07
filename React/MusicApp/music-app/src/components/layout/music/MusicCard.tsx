import React from "react";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/hooks/usePlayer";
import type { SongData } from "@/assets/data/SongData";


const MusicCard: React.FC<{ song: SongData }> = ({ song }) => {
  const { isPlaying, currentSong, setCurrentSong, handlePlay, handlePause } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 🎧 Если кликнули по другой песне — переключаем трек и запускаем
    if (!isCurrentSong) {
      setCurrentSong(song);
      handlePlay();
      return;
    }

    // ⏯ Если клик по текущей — ставим на паузу или продолжаем
    if (isPlaying) handlePause();
    else handlePlay();
  };

  const handleClick = () => {
    // Клик по карточке (не по кнопке) — тоже выбрать песню
    if (!isCurrentSong) {
      setCurrentSong(song);
      handlePlay();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative aspect-square w-full rounded-xl overflow-hidden bg-[#1b1b1f] hover:bg-[#232327] transition-all duration-300 shadow-md ${!isCurrentSong && "cursor-pointer"} `}
    >
      {/* Cover */}
      <img
        src={song.coverUrl}
        alt={song.title}
        className={`w-full h-full object-cover transition-transform duration-300 ${!isCurrentSong && "group-hover:scale-105"}`}
      />

      {/* Play button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick(e);
        }}
        className={`
          absolute right-3 bottom-3 p-3 rounded-full bg-white/90 shadow-lg backdrop-blur-md z-10 
          transition-all duration-300 ease-in-out cursor-pointer
          ${isCurrentSong ? "opacity-100 scale-100 hover:scale-105" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"}
        `}
      >
        {isCurrentSong && isPlaying ? (
          <div className="flex gap-[2px] items-end justify-center w-5 h-5">
            <Pause className="w-5 h-5 text-black" />
          </div>
        ) : (
          <Play className="w-5 h-5 text-black" />
        )}
      </button>

      {/* 🔤 Title / Artist */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000b5] via-[#00000066] to-transparent p-3">
        <h3 className="text-sm font-semibold text-white truncate">{song.title}</h3>
        <p className="text-xs text-gray-300 truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;
