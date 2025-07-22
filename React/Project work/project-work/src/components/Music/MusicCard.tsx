import React from "react";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import type { SongData } from "@/assets/data/SongData";

interface MusicCardProps {
    song: SongData;
}

const MusicCard: React.FC<MusicCardProps> = ({ song }) => {
    const { isPlaying, setIsPlaying, currentSong ,setCurrentSong, handlePlay, handlePause, handlePlayPause } = usePlayer();

    const isCurrentSong = currentSong?.id == song.id;

    const togglePlayPause = (e: React.MouseEvent) => {
        if (isCurrentSong) {
            handlePlayPause();
        }
    }

    const handleClick = () => {
        setCurrentSong({ 
            id: song.id,
            title: song.title,
            artist: song.artist,
            duration: song.duration,
            albumId: song.albumId,
            coverUrl: song.coverUrl || "",
            audioUrl: song.audioUrl || "",
         });
    };

    return (
        <div onClick={handleClick} className="transition-all group relative w-full aspect-[3.5/5] rounded-md overflow-hidden hover:scale-[1.02] shadow-md">
            <img src={song.coverUrl} alt={song.title} className="w-full" />

            <div className="absolute bottom-0 left-0 w-full h-[30%] overflow-hidden">
                <div
                    className="absolute inset-0 filter blur-md"
                    style={{
                        backgroundImage: `url(${song.coverUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>

                <div className="absolute w-full h-full bg-black/40 p-2 flex flex-col justify-around font-semibold text-white">
                    <h3 className=" md:text-sm lg:text-[14px] w-full">{song.title}</h3>
                    <p className="text-[13px] md:text-xs lg:text-[12px] text-[#9898A6] w-full line-clamp-2">{song.artist}</p>
                </div>
            </div>

            <button onClick={handlePlayPause} className={`cursor-pointer absolute right-2 bottom-[32%] bg-white p-2 rounded-full transition-all ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                {(isPlaying && isCurrentSong) ? <Pause className="w-4 h-4 text-black"/> : <Play className="w-4 h-4 text-black" />}
            </button>
        </div>
    );
};

export default MusicCard;