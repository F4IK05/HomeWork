import songs from "@/assets/data/SongData";
import { usePlayer } from "@/contexts/PlayerContext";
import { Pause, Repeat, Shuffle, SkipBack, SkipForward, Volume2, Play, VolumeX, Volume1, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MyToolTip from "./Tooltip";
import { useTranslation } from "react-i18next";


interface PlayerProps {
    isMobile?: boolean;
}

const Player: React.FC<PlayerProps> = ({ isMobile }) => {
    const { t } = useTranslation();
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, handlePlay, handlePause, handlePlayPause } = usePlayer();

    // Уставновка времени и продолжительности музыки
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [isRepeat, setIsRepeat] = useState(false);

    // Работа со звуком
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);

    // Полноценный Player под мобильные(< 768px) устройства
    const [isExpanded, setIsExpanded] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const formattedSeconds = seconds.toString().padStart(2, '0'); // Добавляем ведущий ноль к секундам, если нужно
        return `${minutes}:${formattedSeconds}`;
    }

    // Функция для перемотки аудио
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
        }
        setCurrentTime(Number(e.target.value));
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    }

    const handleLoadedAudio = () => {
        if (audioRef.current) {
            setDuration(audioRef.current?.duration || 0)
        }
    }

    const handlePrevSong = () => {
        let prevIndex = (currentSong?.id || 0) - 1;

        if (prevIndex <= 0) {
            prevIndex = songs.length - 1;
        }

        const prevSong = songs.find(song => song.id === prevIndex);

        setCurrentSong(prevSong);
    }

    const handleNextSong = () => {
        let nextIndex = (currentSong?.id || 0) + 1;

        if (nextIndex >= songs.length) {
            nextIndex = 0;
        }

        const nextSong = songs.find(song => song.id === nextIndex);


        setCurrentSong(nextSong);
    }

    const handleEnded = () => {
        if (isRepeat) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            handleNextSong();
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = Number(e.target.value); // current значение volume-а заменяется на новое
        }

        setVolume(Number(e.target.value));
    }

    const handleVolumeOn = () => {
        if (audioRef.current) {
            audioRef.current.volume = prevVolume;
        }
        setVolume(prevVolume)
    }

    const handleVolumeOff = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0;
        }
        setPrevVolume(volume); // сохраняем текущее значение
        setVolume(0);
    }

    const handleVolumeOnOff = () => {
        if (volume <= 0.01) {
            handleVolumeOn();
        } else {
            handleVolumeOff();
        }
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);


    useEffect(() => {
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current?.addEventListener('loadedmetadata', handleLoadedAudio);
        audioRef.current?.addEventListener('ended', handleEnded)

        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current?.removeEventListener('loadedmetadata', handleLoadedAudio);
            audioRef.current?.removeEventListener('ended', handleEnded);
        }
    }, [currentSong, handleEnded, isRepeat])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // чтобы между песнями громкрость не менялась 
        }
        setCurrentTime(0);
        setDuration(0);
        if (audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true);
        }


    }, [currentSong?.audioUrl]);

    if (!currentSong) return null; // Player не отображается пока не выдрана песня

    console.log(isRepeat)
    return (
        <>
            <audio ref={audioRef} src={currentSong.audioUrl}></audio>
            {isMobile ? (
                <>
                    <div onClick={toggleExpand} className="fixed bottom-0 z-10 h-max bg-[#1e1e22] w-full flex justify-between items-center p-4 transition-all">
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

                    <div className={`fixed inset-0 z-50 bg-[#1e1e22] text-white select-none flex flex-col transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}>

                        <div className={`relative flex items-center justify-center p-4 sm:p-6 transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                            }`}>
                            <button onClick={toggleExpand} className="cursor-pointer absolute left-4 sm:left-6 hover:scale-110 transition-all">
                                <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
                            </button>
                            <div className="uppercase tracking-wide text-gray-400 text-sm sm:text-base">
                                {t('track')}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6">
                            <div className={`flex justify-center w-full mb-6 sm:mb-10 transform transition-all ${isExpanded ? 'opacity-100 rotate-0' : 'opacity-0'
                                }`}>
                                <img className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl shadow-2xl transition-all hover:scale-105"
                                    src={currentSong.coverUrl}
                                    alt={currentSong.title} />
                            </div>

                            <div className={`text-center mb-6 sm:mb-10 transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                <p className="text-xl sm:text-2xl md:text-3xl font-semibold break-words px-4 transition-all duration-300">
                                    {currentSong.title}
                                </p>
                                <p className="text-sm sm:text-base text-gray-400 break-words px-4 mt-2 transition-all">
                                    {currentSong.artist}
                                </p>
                            </div>
                        </div>

                        <div className={`p-4 sm:p-6  transform transition-all ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}>
                            <div className="w-full flex justify-between text-xs sm:text-sm text-gray-400 select-none">
                                <span className="transition-all duration-200">{formatTime(currentTime)}</span>
                                <span className="transition-all duration-200">{formatTime(duration)}</span>
                            </div>

                            <div className="w-full">
                                <input className="w-full h-1 cursor-pointer transition-all hover:h-2"
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek} />
                            </div>

                            <div className="flex items-center justify-center gap-2 sm:gap-4 py-4">
                                <MyToolTip children={
                                    <button className="cursor-pointer p-2 sm:p-3 md:p-4 rounded-full text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 hover:bg-gray-800">
                                        <Shuffle className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("shuffle")} />

                                <MyToolTip children={
                                    <button onClick={handlePrevSong} className="cursor-pointer p-2 sm:p-3 md:p-4 rounded-full text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 hover:bg-gray-800">
                                        <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("previous")} />

                                <MyToolTip children={
                                    <button onClick={handlePlayPause} className={`cursor-pointer p-3 sm:p-4 rounded-full hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg ${isPlaying ? 'bg-[#4B5563] hover:bg-[#374151]' : 'bg-white text-[#4B5563] hover:bg-gray-100'
                                        }`}>
                                        {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7" />}
                                    </button>
                                } side="top" hint={`${isPlaying ? t("pause") : t("play")}`} />

                                <MyToolTip children={
                                    <button onClick={handleNextSong} className="cursor-pointer p-2 sm:p-3 md:p-4 rounded-full text-gray-400 hover:text-white hover:scale-110 transition-all duration-200 hover:bg-gray-800">
                                        <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("next")} />

                                <MyToolTip children={
                                    <button onClick={() => setIsRepeat(!isRepeat)} className={`cursor-pointer p-2 sm:p-3 md:p-4 rounded-full hover:scale-[1.1] transition-all duration-200 ${isRepeat ? "text-white" : "text-gray-400 hover:bg-gray-800"}`}>
                                        <Repeat className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                } side="top" hint={t("enable_repeat")} />
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <div
                    className="w-full z-10 px-4 py-3 text-white fixed bottom-0 h-fit bg-[#1e1e22] flex items-center justify-between transition-all">
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
                            <input className="w-full h-1 cursor-pointer" type="range" min={0} max={duration || 0} value={currentTime} onChange={handleSeek} />
                        </div>
                        <div className="flex items-center gap-4 z-10">
                            <MyToolTip children={
                                <button className="cursor-pointer p-2 rounded-full text-gray-400 hover:text-white hover:scale-[1.1] transition-all">
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

                                <button onClick={() => setIsRepeat(!isRepeat)} className={`cursor-pointer p-2 rounded-full hover:scale-[1.1] transition-all ${isRepeat ? "text-white" : "text-gray-400 hover:text-white"}`}>
                                    <Repeat className="w-4 h-4" />
                                </button>
                            } side="top" hint={isRepeat ? t("disable_repeat") : t("enable_repeat")} />
                        </div>

                    </div>


                    <div className="flex items-center gap-2 w-[10%] text-gray-400">
                        <MyToolTip children={
                            <button onClick={handleVolumeOnOff} className="hover:scale-[1.1] hover:text-white transition-all">
                                {volume == 0 && <VolumeX className="w-4" />}
                                {volume < 0.5 && volume != 0 && <Volume1 className="w-4" />}
                                {volume > 0.5 && <Volume2 className="w-4" />}
                            </button>
                        } side="top" hint={`${volume <= 0.01 ? t("unmute") : t("mute")}`} />

                        <input type="range" className="w-full h-1" step={0.01} min={0} max={1} value={volume} onChange={handleVolumeChange} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Player;