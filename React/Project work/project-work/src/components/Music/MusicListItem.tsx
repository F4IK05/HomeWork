import { usePlayer } from "@/hooks/usePlayer";
import { Pause, Play } from "lucide-react";
import type { SongData } from "@/assets/data/SongData";

interface MusicCardData {
    song: SongData;
}

const MusicListItem: React.FC<MusicCardData> = ({ song }) => {
    const { isPlaying, currentSong ,setCurrentSong, handlePlayPause } = usePlayer();

    const isCurrentSong = currentSong?.id == song.id;

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
        <>
            <div onClick={handleClick} className={`relative flex items-center p-3 hover:bg-[#2a2a2e] transition-all group ${isCurrentSong ? 'bg-[#2a2a2e]' : 'bg-transparent'}`}>
                <div className="w-12 h-12 rounded-md overflow-hidden bg-zinc-800">
                    <img src={song.coverUrl}
                        alt={song.title}
                        className="w-full h-full object-cover"
                    />

                </div>

                <div className="ml-3 flex flex-col">
                    <h3 className="text-white text-sm font-medium truncate">{song.title}</h3>
                    <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </div>

                <button onClick={handlePlayPause} className={`cursor-pointer absolute right-3 ml-2 p-2 rounded-full bg-white/10 opacity-0 transition-all ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {(isPlaying && isCurrentSong) ? <Pause className="w-4 h-4 text-gray-400"/> : <Play className="w-4 h-4 text-gray-400" />}
                </button>
            </div>

        </>
    );
};

export default MusicListItem;