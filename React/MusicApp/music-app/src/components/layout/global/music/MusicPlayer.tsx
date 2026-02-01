import React, { useEffect, useMemo, useState } from "react";
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
  X,
} from "lucide-react";
import { usePlayer } from "@/hooks/usePlayer";
import { useTranslation } from "react-i18next";

interface PlayerProps {
  isMobile?: boolean;
}

const GLASS =
  "bg-[#1e1e22]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]";
const BTN =
  "p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40";
const TOGGLE_OFF = "text-zinc-400 hover:text-white";
const TOGGLE_ON =
  "text-white ring-1 ring-blue-500/30 shadow-[0_0_0_6px_rgba(59,130,246,0.08)]";

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
  const [showVolume, setShowVolume] = useState(false);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const progressBg = useMemo(
    () => ({
      background: `linear-gradient(to right, #3b82f6 ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
    }),
    [progress]
  );

  const volumePercent = useMemo(() => Math.round(volume * 100), [volume]);
  const volumeBg = useMemo(
    () => ({
      background: `linear-gradient(to right, #3b82f6 ${volumePercent}%, rgba(255,255,255,0.15) ${volumePercent}%)`,
    }),
    [volumePercent]
  );

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

  const toggleExpand = () => setIsExpanded((s) => !s);

  useEffect(() => {
    if (isExpanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  if (!currentSong) return null;

  return (
    <>
      {isMobile ? (
        <>
          {/* Mini player (bottom bar) */}
          <div
            onClick={toggleExpand}
            className={`fixed bottom-0 z-20 w-full ${GLASS} flex justify-between items-center p-3 border-t border-white/10 transition-all`}
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 object-cover rounded-lg"
                src={currentSong.coverUrl}
                alt={currentSong.title}
              />
              <div className="text-white">
                <p className="font-semibold text-sm truncate">
                  {currentSong.title}
                </p>
                <p className="text-xs text-zinc-400 truncate">
                  {currentSong.artistName}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className={`rounded-full p-4 transition-all hover:scale-105 ${
                isPlaying
                  ? "bg-zinc-600 text-white"
                  : "bg-white text-[#1e1e22]"
              }`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
          </div>

          {/* Fullscreen */}
          <div
            className={`fixed inset-0 z-30 bg-[#121216] text-white flex flex-col transition-all duration-500 transform ${
              isExpanded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <div className="relative flex items-center justify-center py-4 border-b border-white/10">
              <button
                onClick={toggleExpand}
                className="absolute left-4 hover:scale-110 transition-all"
              >
                <ChevronDown className="w-8 h-8" />
              </button>
              <span className="text-zinc-400 uppercase tracking-widest text-sm">
                {t("now_playing") || "Now Playing"}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className={`w-72 h-72 rounded-2xl shadow-2xl transition-transform ${
                  isPlaying ? "animate-[spin_18s_linear_infinite]" : ""
                } [animation-play-state:paused]`}
                style={{ animationPlayState: isPlaying ? "running" : "paused" }}
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold">{currentSong.title}</h3>
                <p className="text-zinc-400 mt-1">{currentSong.artistName}</p>
              </div>
            </div>

            <div className="px-6">
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeekChange}
                style={progressBg}
              />
            </div>

            <div className="flex items-center justify-center gap-6 py-7">
              <button
                onClick={toggleShuffle}
                className={`${BTN} ${isShuffle ? TOGGLE_ON : TOGGLE_OFF}`}
                aria-pressed={isShuffle}
                aria-label="Shuffle"
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <button
                onClick={handlePrevSong}
                className={`${BTN} ${TOGGLE_OFF}`}
                aria-label="Previous"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={handlePlayPause}
                className={`p-5 rounded-full shadow-lg transition-all ring-1 ring-white/10 hover:scale-105 ${
                  isPlaying
                    ? "bg-zinc-600 hover:bg-zinc-700"
                    : "bg-white text-[#1e1e22] hover:bg-zinc-100"
                }`}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-[2px]" />
                )}
              </button>

              <button
                onClick={handleNextSong}
                className={`${BTN} ${TOGGLE_OFF}`}
                aria-label="Next"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button
                onClick={toggleRepeat}
                className={`${BTN} ${isRepeat ? TOGGLE_ON : TOGGLE_OFF}`}
                aria-pressed={isRepeat}
                aria-label="Repeat"
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Desktop */
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(1100px,94vw)] px-5 py-3 rounded-2xl ${GLASS} text-white z-[9999]`}>
          <div className="flex items-center justify-between gap-4">
            {/* Left: cover + info */}
            <div className="flex items-center gap-3 w-[28%] min-w-[230px]">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-14 h-14 rounded-xl object-cover shadow"
              />
              <div className="truncate">
                <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
                <p className="text-xs text-zinc-400 truncate">{currentSong.artistName}</p>
              </div>
            </div>

            {/* Center: controls + progress */}
            <div className="flex flex-col items-center w-[48%] max-w-[620px]">
              <div className="flex items-center justify-center gap-5 mb-2">
                <button
                  onClick={toggleShuffle}
                  className={`${BTN} ${isShuffle ? TOGGLE_ON : TOGGLE_OFF}`}
                  aria-pressed={isShuffle}
                  aria-label="Shuffle"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrevSong}
                  className={`${BTN} ${TOGGLE_OFF}`}
                  aria-label="Previous"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className={`p-3 rounded-full shadow-lg transition-all ring-1 ring-white/10 hover:scale-105 ${
                    isPlaying
                      ? "bg-zinc-600 hover:bg-zinc-700"
                      : "bg-white text-[#1e1e22] hover:bg-zinc-100"
                  }`}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-[1px]" />
                  )}
                </button>

                <button
                  onClick={handleNextSong}
                  className={`${BTN} ${TOGGLE_OFF}`}
                  aria-label="Next"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleRepeat}
                  className={`${BTN} ${isRepeat ? TOGGLE_ON : TOGGLE_OFF}`}
                  aria-pressed={isRepeat}
                  aria-label="Repeat"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 w-full text-[11px] text-zinc-400">
                <span className="min-w-[34px] tabular-nums">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeekChange}
                  style={progressBg}
                  aria-label="Seek"
                />
                <span className="min-w-[34px] text-right tabular-nums">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right: volume */}
            <div className="flex items-center justify-end gap-3 w-[24%] min-w-[180px]">
              <button
                onClick={() => setShowVolume((s) => !s)}
                className={`${BTN} ${TOGGLE_OFF}`}
                aria-expanded={showVolume}
                aria-controls="volume-slider"
                aria-label="Volume"
              >
                {showVolume ? <X className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {showVolume && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVolumeToggle}
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Mute / Unmute"
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
                    id="volume-slider"
                    type="range"
                    className="w-[110px] h-2 rounded-full appearance-none cursor-pointer"
                    step={0.01}
                    min={0}
                    max={1}
                    value={volume}
                    onChange={handleVolumeChange}
                    style={volumeBg}
                    aria-label="Volume"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
