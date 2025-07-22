import React, { createContext, useContext, useState } from "react";
import type { SongData } from "@/assets/data/SongData";


interface PlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentSong: SongData | null;
  setCurrentSong: (song: SongData) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handlePlayPause: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<SongData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handlePlayPause = () => setIsPlaying(val => !val);

  return (
    <PlayerContext.Provider value={{ isPlaying, setIsPlaying, currentSong, setCurrentSong, handlePlay, handlePause, handlePlayPause }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
};