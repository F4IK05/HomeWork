import { usePlayer } from "@/hooks/usePlayer";
import { Pause, Repeat, Shuffle, SkipBack, SkipForward, Volume2, Play, VolumeX, Volume1, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import MyToolTip from "./Tooltip";
import { useTranslation } from "react-i18next";

interface PlayerProps {
    isMobile?: boolean;
}

const Player: React.FC<PlayerProps> = ({ isMobile }) => {
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
        formatTime
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

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (!currentSong) return null;

    return (
        <>
            {isMobile ? (
                <>
                    {/* Мини плеер */}
                    <div onClick={toggleExpand} className="fixed bottom-0 z-9998 h-max bg-[#1e1e22] w-full flex justify-between items-center p-4 transition-all">
                        <div className="flex items-center gap-4">
                            <img className="w-20 rounded-xl" src={currentSong.coverUrl} alt={currentSong.title} />
                            <div className="text-white">
                                <p className="font-bold text-base truncate">{currentSong.title}</p>
                                <p className="text-xs truncate">{currentSong.artist}</p>
                            </div>
                        </div>
                        <div className="mr-5">
                            <MyToolTip children={
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePlayPause();
                                    }}
                                    className={`cursor-pointer rounded-full p-4 transition-all hover:scale-105 ${isPlaying ? 'bg-[#4B5563] text-white' : 'bg-white text-[#4B5563]'}`}>
                                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                </button>
                            } side="top" hint={isPlaying ? t("pause") : t("play")} />
                        </div>
                    </div>

                    {/* Полноэкранный плеер */}
                    <div className={`p-4 fixed inset-0 z-9999 bg-[#1e1e22] text-white select-none flex flex-col transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>

                        <div className={`relative flex items-center justify-center sm:p-6 transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                            <button onClick={toggleExpand} className="cursor-pointer absolute -left-1 sm:left-6 hover:scale-110 transition-all">
                                <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
                            </button>
                            <div className="uppercase tracking-wide text-gray-400 text-sm sm:text-base">
                                {t('track')}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6">
                            <div className={`flex justify-center w-full mb-6 sm:mb-10 transform transition-all ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                <img className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl shadow-xl transition-all hover:scale-[1.05]"
                                    src={currentSong.coverUrl}
                                    alt={currentSong.title} />
                            </div>

                            <div className={`text-center mb-6 sm:mb-10 transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                                <p className="text-xl sm:text-2xl md:text-3xl font-semibold break-words px-4 transition-all duration-300">
                                    {currentSong.title}
                                </p>
                                <p className="text-sm sm:text-base text-gray-400 break-words px-4 mt-2 transition-all">
                                    {currentSong.artist}
                                </p>
                            </div>
                        </div>

                        <div className={`p-4 sm:p-6 transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="w-full flex justify-between text-xs sm:text-sm text-gray-400 select-none">
                                <span className="transition-all duration-200">{formatTime(currentTime)}</span>
                                <span className="transition-all duration-200">{formatTime(duration)}</span>
                            </div>

                            <div className="w-full">
                                <input
                                    className="w-full h-1 cursor-pointer transition-all hover:h-2"
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeekChange}
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 sm:gap-4 py-4">
                                <MyToolTip children={
                                    <button
                                        onClick={toggleShuffle}
                                        className={`cursor-pointer p-2 sm:p-3 md:p-4 rounded-full hover:scale-110 transition-all duration-200 ${isShuffle ? 'text-white' : 'text-gray-400 hover:text-white '}`}
                                    >
                                        <Shuffle className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("shuffle")} />

                                <MyToolTip children={
                                    <button onClick={handlePrevSong} className="cursor-pointer p-2 sm:p-3 md:p-4 rounded-full text-gray-400 hover:text-white hover:scale-110 transition-all duration-20">
                                        <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("previous")} />

                                <MyToolTip children={
                                    <button onClick={handlePlayPause} className={`cursor-pointer p-3 sm:p-4 rounded-full hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg ${isPlaying ? 'bg-[#4B5563] hover:bg-[#374151]' : 'bg-white text-[#4B5563] hover:bg-gray-100'}`}>
                                        {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7" />}
                                    </button>
                                } side="top" hint={`${isPlaying ? t("pause") : t("play")}`} />

                                <MyToolTip children={
                                    <button onClick={handleNextSong} className="cursor-pointer p-2 sm:p-3 md:p-4 rounded-full text-gray-400 hover:text-white hover:scale-110 transition-all duration-200">
                                        <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("next")} />

                                <MyToolTip children={
                                    <button onClick={toggleRepeat} className={`cursor-pointer p-2 sm:p-3 md:p-4 rounded-full hover:scale-[1.1] transition-all duration-200 ${isRepeat ? "text-white " : "text-gray-400 hover:text-white"}`}>
                                        <Repeat className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={isRepeat ? t("disable_repeat") : t("enable_repeat")} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Десктоп плеер */
                <div className="w-full z-9999 px-4 py-3 text-white fixed bottom-0 h-fit bg-[#1e1e22] flex items-center justify-between transition-all">
                    <div className="flex items-center gap-4 w-[25%]">
                        <img className="w-14 rounded select-none" src={currentSong.coverUrl} alt={currentSong.title} />
                        <div className="min-w-0 select-none pointer-events-none">
                            <p className="text-md font-bold truncate">{currentSong.title}</p>
                            <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center gap-2 flex-1 max-w-[60%]">
                        <div className="absolute top-1 w-full flex justify-between text-sm text-gray-400 select-none">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 w-full">
                            <input className="w-full h-1 cursor-pointer" type="range" min={0} max={duration || 0} value={currentTime} onChange={handleSeekChange}/>
                        </div>
                        <div className="flex items-center gap-4 z-10">
                            <MyToolTip children={
                                <button
                                    onClick={toggleShuffle}
                                    className={`cursor-pointer p-2 rounded-full hover:scale-[1.1] transition-all ${isShuffle ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Shuffle className="w-4 h-4" />
                                </button>
                            } side="top" hint={t("shuffle")} />

                            <MyToolTip children={
                                <button onClick={handlePrevSong} className="cursor-pointer p-2 rounded-full text-gray-400 hover:text-white hover:scale-[1.1] transition-all">
                                    <SkipBack className="w-4 h-4" />
                                </button>
                            } side="top" hint={t("previous")} />

                            <MyToolTip children={
                                <button onClick={handlePlayPause} className={`cursor-pointer p-2 rounded-full hover:scale-[1.1] active:scale-[1] transition-all ${isPlaying ? 'bg-[#4B5563]' : 'bg-white text-[#4B5563]'}`}>
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                            } side="top" hint={`${isPlaying ? t("pause") : t("play")}`} />

                            <MyToolTip children={
                                <button onClick={handleNextSong} className="cursor-pointer p-2 rounded-full text-gray-400 hover:text-white hover:scale-[1.1] transition-all">
                                    <SkipForward className="w-4 h-4" />
                                </button>
                            } side="top" hint={t("next")} />

                            <MyToolTip children={
                                <button onClick={toggleRepeat} className={`cursor-pointer p-2 rounded-full hover:scale-[1.1] transition-all ${isRepeat ? "text-white" : "text-gray-400 hover:text-white"}`}>
                                    <Repeat className="w-4 h-4" />
                                </button>
                            } side="top" hint={isRepeat ? t("disable_repeat") : t("enable_repeat")} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-[10%] text-gray-400">
                        <MyToolTip children={
                            <button onClick={handleVolumeToggle} className="hover:scale-[1.1] hover:text-white transition-all">
                                {volume == 0 && <VolumeX className="w-4" />}
                                {volume < 0.5 && volume != 0 && <Volume1 className="w-4" />}
                                {volume > 0.5 && <Volume2 className="w-4" />}
                            </button>
                        } side="top" hint={`${volume <= 0.01 ? t("unmute") : t("mute")}`} />

                        <input type="range" className="w-full h-1" step={0.01} min={0} max={1} value={volume} onChange={handleVolumeChange}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Player;