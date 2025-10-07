import React, { createContext, useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { SongData } from "@/assets/data/SongData";
import songs from "@/assets/data/SongData";

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

  // 
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

  const [playlist, setPlaylist] = useState<SongData[]>(songs);
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0'); // Добавляем ноль к секундам, если нужно
    return `${minutes}:${formattedSeconds}`;
  }

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const setCurrentSong = (song: SongData) => {
    if (currentSong && currentSong.id == song.id) {
      return;
    }

    const songIndex = playlist.findIndex(s => s.id == song.id);

    setCurrentIndex(songIndex);
    setCurrentSongState(song);

    if (audioRef.current) {
      audioRef.current.src = song.audioUrl ?? "";
      audioRef.current.load();
    }
  };

  const handlePlay = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const playAlbum = (albumSongs: SongData[], startIndex: number) => {
    setPlaylist(albumSongs);
    setCurrentIndex(startIndex);

    const song = albumSongs[startIndex];

    if (song) {
      setCurrentSongState(song);
    }
  }

  // const handlePrevSong = () => {
  //       let prevIndex = (currentSong?.id || 0) - 1;

  //       if (prevIndex < 0) {
  //           prevIndex = songs.length - 1;
  //       }

  //       const prevSong = songs.find(song => song.id === prevIndex);

  //       setCurrentSongState(prevSong);
  //   }
  
  const getNextIndex = useCallback((currentIndex: number) => {
    let nextIndex = currentIndex + 1;

    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * playlist.length);

      while (randomIndex == currentIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }

      return randomIndex;
    }

    if (nextIndex >= playlist.length) {
      nextIndex = 0;
    }

    return nextIndex;
  }, [isShuffle, playlist.length]);

  const getPrevIndex = (currentIndex: number) => {
    let prevIndex = currentIndex - 1;

    if (isShuffle) {
      return getNextIndex(currentIndex); // Такая же логика
    }

    if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }

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

  const handleSeek = useCallback((time: number) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //         if (audioRef.current) {
  //             audioRef.current.volume = Number(e.target.value); // current значение volume-а заменяется на новое
  //         }

  //         setVolume(Number(e.target.value));
  //     }

  const setVolume = (newVolume: number) => {
    audioRef.current.volume = newVolume;
    setVolumeState(newVolume);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (isShuffle && !isRepeat) {
      setIsShuffle(false);
    }
    
  }
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (isRepeat && !isShuffle) {
      setIsRepeat(false);
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedAudio = useCallback(() => {
    setDuration(audioRef.current?.duration || 0)
    audioRef.current.volume = volume;
  }, [volume])

  const handleEnded = React.useCallback(() => {
    if (isRepeat) {
      handleSeek(0);
      handlePlay();
    } else {
      handleNextSong();
    }
  }, [isRepeat, handleSeek, handlePlay, handleNextSong]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedAudio);
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedAudio);
      audio.removeEventListener('ended', handleEnded)
    }
  }, [handleEnded, handleLoadedAudio]);

  // Автоматическое воспроизведение при смене трека
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl ?? "";
      audioRef.current.load();

      setCurrentTime(0);
      setDuration(0);

      handlePlay();
    }
  }, [currentSong, handlePlay]);

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