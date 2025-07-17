import { Pause, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import React from "react";

interface PlayerProps {
    isMobile?: boolean;
    isOpen?: boolean;
}

const Player: React.FC<PlayerProps> = ({ isMobile, isOpen }) => {
    return (
        <div className={`z-40 px-4 text-white fixed bottom-0 h-[10%] bg-[#1e1e22] flex items-center justify-between transition-all ${isMobile ? 'ml-0 w-full' : isOpen ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-16 w-[calc(100%-4rem)]'}`}>
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12" src="https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png" alt="" />
                <div>
                    <p>Name</p>
                    <p>sas</p>
                </div>
            </div>
            <div className="flex flex-col items-center m-auto gap-3">
                <div className="flex items-center gap-5 transition-all hover:scale-y-[2]">
                    <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                        <hr className="h-1 border-none w-[10%] bg-red-300 rounded-full" />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="cursor-pointer">
                        <Shuffle />
                    </button>
                    <button className="cursor-pointer">
                        <SkipBack />
                    </button>
                    <button className="cursor-pointer">
                        <Pause />
                    </button>
                    <button className="cursor-pointer">
                        <SkipForward />
                    </button>
                    <button className="cursor-pointer">
                        <Repeat />
                    </button>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
                <Volume2/>
                <div className="w-20 h-1 rounded-full bg-slate-50">

                </div>
            </div>
        </div>
    )
}

export default Player;