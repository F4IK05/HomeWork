import { usePlayer } from "@/hooks/usePlayer";
import { Pause, Play } from "lucide-react";
import type { SongData } from "@/assets/data/SongData";

interface MusicListItemProps {
  song: SongData;
}

const MusicListItem: React.FC<MusicListItemProps> = ({ song }) => {
  const {
    isPlaying,
    currentSong,
    setCurrentSong,
    handlePlay,
    handlePause,
  } = usePlayer();

  const isCurrentSong = currentSong?.id === song.id;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isCurrentSong) {
      setCurrentSong(song);
      handlePlay();
      return;
    }

    if (isPlaying) handlePause();
    else handlePlay();
  };

  const handleClick = () => {
    if (!isCurrentSong) {
      setCurrentSong(song);
      handlePlay();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center p-3 rounded-lg cursor-pointer transition-all w-full
      ${isCurrentSong ? "bg-[#2a2a2e]" : "hover:bg-[#232327]"}`}
    >
      {/* Обложка */}
      <div className="w-12 h-12 rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Текст */}
      <div className="ml-3 flex flex-col flex-grow min-w-0">
        <h3 className="text-white text-sm font-medium truncate">{song.title}</h3>
        <p className="text-gray-400 text-xs truncate">{song.artist}</p>
      </div>

      {/* Кнопка Play/Pause */}
      <button
        onClick={handlePlayClick}
        className={`absolute right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 
        transition-all duration-200 
        ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        {isCurrentSong && isPlaying ? (
          <Pause className="w-5 h-5 text-gray-200" />
        ) : (
          <Play className="w-5 h-5 text-gray-200" />
        )}
      </button>
    </div>
  );
};

export default MusicListItem;
