import { Pause, Repeat, Shuffle, SkipBack, SkipForward, Volume2, Play } from "lucide-react";
import React from "react";

interface PlayerProps {
    isMobile?: boolean;
    isOpen?: boolean;
}

const Player: React.FC<PlayerProps> = ({ isMobile, isOpen }) => {
    return (
        <>
            {isMobile ? (
                <div className="z-40 h-max bg-[#1e1e22] ml-0 w-full flex justify-between items-center p-4">
                    <div className="flex items-center gap-4">
                        <img className="w-20 rounded-xl" src="https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png" alt="" />
                        <div className="text-white ">
                            <p className="font-bold">After Hours</p>
                            <p className="text-sm">The Weekend</p>
                        </div>
                    </div>
                    <div className="flex jus">
                        <button className="rounded-full bg-white p-3">
                            <Play/>
                        </button>
                        
                    </div>


                </div>
            ) : (
                <div className={`z-40 px-4 text-white fixed bottom-0 h-[10%] bg-[#1e1e22] flex items-center justify-between transition-all ${isOpen ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-16 w-[calc(100%-4rem)]'}`}>
                    <div className="flex items-center gap-4">
                        <img className="w-12" src="https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png" alt="" />
                        <div>
                            <p className="font-bold">After Hours</p>
                            <p className="text-sm">The Weekend</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center m-auto gap-3">
                        <div className="flex items-center gap-5 transition-all hover:scale-y-[2]">
                            <div className="w-[60vw] min-w-[300px] bg-gray-300 rounded-full cursor-pointer">
                                <hr className="h-1 border-none w-[10%] bg-red-300 rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="cursor-pointer text-[#4B5563] border-[#4B5563] border-1 p-2 rounded-full" >
                                <Shuffle className="w-3 h-3"/>
                            </button>
                            <button className="cursor-pointer text-[#4B5563] border-[#4B5563] border-1 p-2 rounded-full">
                                <SkipBack className="w-3 h-3"/>
                            </button>
                            <button className="cursor-pointer border-[#4B5563] border-1 p-2 rounded-full">
                                <Pause />
                            </button>
                            <button className="cursor-pointer text-[#4B5563] border-[#4B5563] border-1 p-2 rounded-full">
                                <SkipForward className="w-3 h-3"/>
                            </button>
                            <button className="cursor-pointer border-[#4B5563] border-1 p-2 rounded-full">
                                <Repeat className="w-3 h-3"/>
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <Volume2 />
                        <div className="w-20 h-1 rounded-full bg-slate-50">

                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Player;