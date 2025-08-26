import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, Clock, Pause, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import songs from "@/assets/data/SongData";
import albums from "@/assets/data/AlbumData";
import { useTranslation } from "react-i18next";
import { usePlayer } from "@/hooks/usePlayer";

const DisplayAlbum: React.FC = () => {
    const { t } = useTranslation();

    const { currentSong, isPlaying, handlePlay, handlePause, playAlbum } = usePlayer()

    const navigate = useNavigate();
    const { id } = useParams(); // для получения параметра из url
    const albumData = albums[id];

    // Песни для текущего альбома
    const albumSongs = songs.filter(song => song.albumId === albumData.id);

    // Для воспроизведения всего альбома
    const handlePlayAlbum = () => {
        const isCurrentAlbumPlaying = albumSongs.some(song => song.id === currentSong?.id);
        if (isCurrentAlbumPlaying) {
            if (isPlaying) {
                handlePause();
            } else {
                handlePlay()
            }
        } else {
            playAlbum(albumSongs, 0);
        }
    }

    // Для конкретной песни
    const handlePlaySong = (song, index: number) => {
        playAlbum(albumSongs, index)
    }

    const handlePlayPause = (song, index: number) => {
        if (currentSong?.id == song.id) {
            if (isPlaying) {
                handlePause();
            } else {
                handlePlay()
            }
        } else {
            handlePlaySong(song, index)
        }
    }

    return (
        <>
            <div className="mt-5">
                <button className="bg-[#1e1e22] p-3 md:p-2 rounded-full hover:bg-[#2a2a2e] transition-all " onClick={() => navigate('/')}>
                    <ChevronLeft className="w-7 h-7 md:w-5 md:h-5 text-white" />
                </button>

                <div className="mt-5 flex flex-col md:flex-row gap-10 text-white">
                    <div className="min-w-50 rounded overflow-hidden m-auto md:m-0">
                        <img className="w-60 md:w-50" src={albumData.coverUrl} alt="" />

                    </div>
                    <div className="relative flex justify-between items-center w-full">
                        <div className="flex flex-col gap-2">
                            <p className="hidden md:block uppercase tracking-wide">{t("album")}</p>
                            <p className="text-3xl sm:text-3xl md:text-5xl font-bold text-wrap">{albumData.title}</p>
                            <p className="font-semibold text-sm md:text-base text-gray-300 md:hidden cursor-pointer hover:underline">{albumData.artist}</p>
                            <p className="font-semibold text-sm md:text-base text-gray-300 flex items-center gap-1">
                                <img className="w-10 rounded-full hidden md:inline" src={albumData.artistImgUrl} alt="" />
                                <span className="hidden md:inline cursor-pointer hover:underline">{albumData.artist}</span>
                                <span className="md:hidden">{t("album")}</span> • {albumData.releaseYear}
                            </p>
                        </div>
                        <div className="absolute right-10 bottom-0">
                            <button className="bg-white text-black p-4 sm:p-3 rounded-full" onClick={handlePlayAlbum}>
                                {isPlaying && albumSongs.find(song => song.id === currentSong?.id) ? (
                                    <Pause className="w-7 h-7" />
                                ) : (
                                    <Play className="w-7 h-7" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 text-gray-400 mt-5 mb-2 pl-2 select-none">
                <p><b className="mr-5 hidden sm:inline">#</b>{t("title")}</p>
                <p className="flex justify-end">{t("plays")}</p>
                <p className="m-auto"><Clock className="w-4" /></p>
            </div>
            <Separator className="bg-gray-400" />


            <div className="mb-10">
                {albumSongs.map((song, index) => {
                    const isCurrentSong = currentSong?.id == song.id;
                    const isCurrentSongPlaying = isCurrentSong && isPlaying;

                    return (
                        <div key={index} className={`grid grid-cols-3 text-white hover:bg-[#2a2a2e] py-5 ${isCurrentSong && "bg-[#2a2a2e]"}`} onClick={() => handlePlayPause(song, index)}>
                            <p className="pl-2 text-nowrap">
                                <b className="mr-5 hidden sm:inline">{index + 1}</b>
                                {song.title}
                            </p>
                            <p className="flex justify-end mr-3">-</p>
                            <p className="m-auto">{song.duration}</p>
                        </div>
                    )

                })}
            </div>

        </>

    )
}

export default DisplayAlbum;