import React, { useEffect, useState } from "react";
import {
    Pause,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Volume1,
    ChevronDown,
} from "lucide-react";
import { usePlayer } from "@/hooks/usePlayer";
// import MyToolTip from "../Tooltip";
// import EqualizerWaves from "../AnimatedIcons";
import { useTranslation } from "react-i18next";

interface PlayerProps {
    isMobile?: boolean;
}

const MusicPlayer: React.FC<PlayerProps> = ({ isMobile }) => {
    const { t } = useTranslation();
    const {
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isRepeat,
        isShuffle,
        handlePlayPause,
        handleNextSong,
        handlePrevSong,
        handleSeek,
        setVolume,
        toggleRepeat,
        toggleShuffle,
        formatTime,
    } = usePlayer();

    const [isExpanded, setIsExpanded] = useState(false);
    const [prevVolume, setPrevVolume] = useState(1);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSeek(Number(e.target.value));
    };

    const handleVolumeToggle = () => {
        if (volume <= 0.01) {
            setVolume(prevVolume);
        } else {
            setPrevVolume(volume);
            setVolume(0);
        }
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isExpanded]);

    if (!currentSong) return null;
    
    return (
        <>
            {isMobile ? (
                <>
                    {/* Мини-плеер (внизу) */}
                    <div
                        onClick={toggleExpand}
                        className="fixed bottom-0 z-20 bg-[#1e1e22] w-full flex justify-between items-center p-4 border-t border-[#2a2a2e] transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                className="w-16 h-16 object-cover rounded-md"
                                src={currentSong.coverUrl}
                                alt={currentSong.title}
                            />
                            <div className="text-white">
                                <p className="font-semibold text-base truncate">
                                    {currentSong.title}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {currentSong.artist}
                                </p>
                            </div>
                        </div>

                        <div className="mr-4 flex items-center justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayPause();
                                }}
                                className={`cursor-pointer rounded-full p-4 transition-all hover:scale-105 ${isPlaying ? 'bg-[#4B5563] text-white' : 'bg-white text-[#4B5563]'}`}>
                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Полноэкранный плеер */}
                    <div
                        className={`fixed inset-0 z-30 bg-[#1e1e22] text-white flex flex-col transition-all duration-500 transform ${isExpanded
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                            }`}
                    >
                        {/* Заголовок */}
                        <div className="relative flex items-center justify-center py-4 border-b border-[#2a2a2e]">
                            <button
                                onClick={toggleExpand}
                                className="absolute left-4 hover:scale-110 transition-all"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </button>
                            <span className="text-gray-400 uppercase tracking-widest text-sm">
                                {t("now_playing") || "Now Playing"}
                            </span>
                        </div>

                        {/* Обложка */}
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <img
                                src={currentSong.coverUrl}
                                alt={currentSong.title}
                                className="w-72 h-72 rounded-xl shadow-xl hover:scale-[1.03] transition-all"
                            />
                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-semibold">{currentSong.title}</h3>
                                <p className="text-gray-400 mt-2">{currentSong.artist}</p>
                            </div>
                        </div>

                        {/* Прогресс бар */}
                        <div className="px-6">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                            <input
                                type="range"
                                className="w-full accent-blue-500 cursor-pointer"
                                min={0}
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeekChange}
                            />
                        </div>

                        {/* Управление */}
                        <div className="flex items-center justify-center gap-5 py-6">
                            <button
                                onClick={toggleShuffle}
                                className={`p-3 rounded-full transition-all ${isShuffle ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Shuffle className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handlePrevSong}
                                className="p-3 text-gray-400 hover:text-white transition-all"
                            >
                                <SkipBack className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handlePlayPause}
                                className={`p-4 rounded-full transition-all shadow-lg ${isPlaying
                                    ? "bg-[#4B5563] hover:bg-[#374151]"
                                    : "bg-white text-[#1e1e22] hover:bg-gray-200"
                                    }`}
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6" />
                                ) : (
                                    <Play className="w-6 h-6 ml-[2px]" />
                                )}
                            </button>

                            <button
                                onClick={handleNextSong}
                                className="p-3 text-gray-400 hover:text-white transition-all"
                            >
                                <SkipForward className="w-5 h-5" />
                            </button>
                            <button
                                onClick={toggleRepeat}
                                className={`p-3 rounded-full transition-all ${isRepeat ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Repeat className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                /* Desktop Player */
                <div className="fixed bottom-0 left-0 w-full bg-[#1e1e22] border-t border-[#2a2a2e] text-white px-5 py-3 flex items-center justify-between z-[9999]">
                    {/* Левая часть — обложка и инфо */}
                    <div className="flex items-center gap-3 w-[25%] min-w-[220px]">
                        <img
                            src={currentSong.coverUrl}
                            alt={currentSong.title}
                            className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="truncate">
                            <h3 className="text-base font-semibold truncate">
                                {currentSong.title}
                            </h3>
                            <p className="text-sm text-gray-400 truncate">
                                {currentSong.artist}
                            </p>
                        </div>
                    </div>

                    {/* Центральная панель */}
                    <div className="flex flex-col items-center w-[50%]">
                        <div className="flex items-center justify-center gap-5 mb-2">
                            {/* <MyToolTip
                hint={t("shuffle")}
                children={
                  
                }
              /> */}
                            <button
                                onClick={toggleShuffle}
                                className={`p-2 rounded-full transition-all ${isShuffle
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Shuffle className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handlePrevSong}
                                className="p-2 text-gray-400 hover:text-white transition-all"
                            >
                                <SkipBack className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handlePlayPause}
                                className={`p-3 rounded-full shadow-lg transition-all ${isPlaying
                                    ? "bg-[#4B5563] hover:bg-[#374151]"
                                    : "bg-white text-[#1e1e22] hover:bg-gray-200"
                                    }`}
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5" />
                                ) : (
                                    <Play className="w-5 h-5 ml-[1px]" />
                                )}
                            </button>
                            <button
                                onClick={handleNextSong}
                                className="p-2 text-gray-400 hover:text-white transition-all"
                            >
                                <SkipForward className="w-5 h-5" />
                            </button>
                            <button
                                onClick={toggleRepeat}
                                className={`p-2 rounded-full transition-all ${isRepeat ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Repeat className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Прогресс */}
                        <div className="flex items-center gap-2 w-full text-xs text-gray-400">
                            <span className="min-w-[32px]">{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                className="w-full accent-blue-500 cursor-pointer"
                                min={0}
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeekChange}
                            />
                            <span className="min-w-[32px] text-right">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>

                    {/* Правая часть — громкость */}
                    <div className="flex items-center gap-2 w-[15%] justify-end">
                        <button
                            onClick={handleVolumeToggle}
                            className="text-gray-400 hover:text-white transition-all"
                        >
                            {volume === 0 ? (
                                <VolumeX className="w-4 h-4" />
                            ) : volume < 0.5 ? (
                                <Volume1 className="w-4 h-4" />
                            ) : (
                                <Volume2 className="w-4 h-4" />
                            )}
                        </button>
                        <input
                            type="range"
                            className="w-[80px] accent-blue-500 cursor-pointer"
                            step={0.01}
                            min={0}
                            max={1}
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MusicPlayer;
