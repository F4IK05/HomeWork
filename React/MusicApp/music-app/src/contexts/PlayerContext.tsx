import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { SongData } from "@/types/SongData";
import { songApi } from "@/api/songApi";

interface PlayerContextType {
  // Основные состояния
  isPlaying: boolean;
  currentSong: SongData | null;
  currentTime: number;
  duration: number;

  // Доп. настройки
  volume: number;
  isRepeat: boolean;
  isShuffle: boolean;

  // Плейлист
  playlist: SongData[];
  currentIndex: number;

  // Основные методы управления
  setCurrentSong: (song: SongData) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handlePlayPause: () => void;

  handlePrevSong: () => void;
  handleNextSong: () => void;
  playAlbum: (albumSongs: SongData[], startIndex: number) => void;

  // Управление воспроизведением
  handleSeek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;

  formatTime: (timeInSeconds: number) => string;

  audioRef: RefObject<HTMLAudioElement>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSongState] = useState<SongData | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolumeState] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const [playlist, setPlaylist] = useState<SongData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // Формат времени
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // 🔹 Установка текущей песни
  const setCurrentSong = (song: SongData) => {
    if (currentSong && currentSong.id === song.id) return;

    const songIndex = playlist.findIndex((s) => s.id === song.id);
    if (songIndex !== -1) setCurrentIndex(songIndex);

    setCurrentSongState(song);

    if (audioRef.current) {
      audioRef.current.src = song.url ?? "";
      audioRef.current.load();
    }
  };

  // ▶️ Воспроизведение
  const handlePlay = useCallback(() => {
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  // ⏸ Пауза
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    isPlaying ? handlePause() : handlePlay();
  };

  // Проигрывание альбома
  const playAlbum = (albumSongs: SongData[], startIndex: number) => {
    setPlaylist(albumSongs);
    setCurrentIndex(startIndex);
    const song = albumSongs[startIndex];
    if (song) setCurrentSongState(song);
  };

  // Следующий трек
  const getNextIndex = useCallback(
    (currentIndex: number) => {
      if (playlist.length === 0) return 0;

      let nextIndex = isShuffle
        ? Math.floor(Math.random() * playlist.length)
        : currentIndex + 1;

      if (nextIndex >= playlist.length) nextIndex = 0;
      return nextIndex;
    },
    [isShuffle, playlist.length]
  );

  // ⏮ Предыдущий трек
  const getPrevIndex = (currentIndex: number) => {
    if (playlist.length === 0) return 0;

    let prevIndex = isShuffle
      ? Math.floor(Math.random() * playlist.length)
      : currentIndex - 1;

    if (prevIndex < 0) prevIndex = playlist.length - 1;
    return prevIndex;
  };

  const handleNextSong = useCallback(() => {
    const nextIndex = getNextIndex(currentIndex);
    const nextSong = playlist[nextIndex];
    if (nextSong) {
      setCurrentIndex(nextIndex);
      setCurrentSongState(nextSong);
    }
  }, [currentIndex, getNextIndex, playlist]);

  const handlePrevSong = () => {
    if (currentTime > 3) {
      handleSeek(0);
      return;
    }
    const prevIndex = getPrevIndex(currentIndex);
    const prevSong = playlist[prevIndex];
    if (prevSong) {
      setCurrentIndex(prevIndex);
      setCurrentSongState(prevSong);
    }
  };

  // ⏩ Перемотка
  const handleSeek = useCallback((time: number) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  // 🔊 Громкость
  const setVolume = (newVolume: number) => {
    audioRef.current.volume = newVolume;
    setVolumeState(newVolume);
  };

  // 🔁 Повтор / случайный порядок
  const toggleRepeat = () => {
    setIsRepeat((prev) => !prev);
    if (isShuffle) setIsShuffle(false);
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
    if (isRepeat) setIsRepeat(false);
  };

  // Обновления времени
  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);

  const handleLoadedAudio = useCallback(() => {
    setDuration(audioRef.current.duration || 0);
    audioRef.current.volume = volume;
  }, [volume]);

  const handleEnded = useCallback(() => {
    if (isRepeat) {
      handleSeek(0);
      handlePlay();
    } else {
      handleNextSong();
    }
  }, [isRepeat, handleSeek, handlePlay, handleNextSong]);

  // Подписка на события
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedAudio);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedAudio);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleLoadedAudio, handleEnded]);

  // Автоматическое воспроизведение при смене трека
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url ?? "";
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      handlePlay();
    }
  }, [currentSong, handlePlay]);

  // 📡 Загрузка плейлиста при первом рендере
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await songApi.getAll();
        setPlaylist(data);
      } catch (error) {
        console.error("Ошибка загрузки песен в PlayerContext:", error);
      }
    };
    loadSongs();
  }, []);

  const value: PlayerContextType = {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    volume,
    isRepeat,
    isShuffle,
    playlist,
    currentIndex,

    setCurrentSong,
    handlePlay,
    handlePause,
    playAlbum,
    handlePlayPause,
    handleNextSong,
    handlePrevSong,
    handleSeek,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    formatTime,
    audioRef,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
