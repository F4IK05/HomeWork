import React from "react";
import { Play } from "lucide-react";

interface MusicCardProps {
    title: string;
    subtitle: string;
    imageUrl: string;
}

const MusicCard: React.FC<MusicCardProps> = ({
    title,
    subtitle,
    imageUrl,
}) => {
    return (
        <div className="transition-all group relative w-full aspect-3/5 rounded-md overflow-hidden hover:scale-[1.02] bg-zinc-900 shadow-md">
            <img src={imageUrl} alt={title} className="w-full h-[70%] object-cover" />
            
            <div className="absolute bottom-0 left-0 w-full h-[30%] overflow-hidden">
                <div
                    className="absolute inset-0 filter blur-md"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                
                <div className="absolute w-full h-full bg-black/40 p-2 flex flex-col justify-around font-semibold text-white line-clamp-2 ">
                    <h3 className="text-sm w-full">{title}</h3>
                    <p className="text-[11px] text-[#9898A6] w-full line-cramp-2">{subtitle}</p>
                </div>
            </div>
            
            <button className="cursor-pointer absolute right-2 bottom-[32%] bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                <Play className="w-4 h-4 text-black" />
            </button>
        </div>
    );
};

{/* <div className="transition-all group relative w-52 h-[300px] rounded-md overflow-hidden hover:scale-[1.02] bg-zinc-900 shadow-md">
                <img src={imageUrl} alt={title} className="w-full h-52 object-cover" />

                <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden">
                    <div
                        className="absolute inset-0 filter blur-md"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>

                    <div className="absolute w-full h-full bg-black/40 p-2 flex flex-col justify-around font-semibold text-white">
                        <h3 className="truncate">{title}</h3>
                        <p className="text-[11px] text-[#9898A6] w-full">{subtitle}</p>
                    </div>
                </div>

                <button className="cursor-pointer absolute right-4 bottom-20 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <Play className="w-5 h-5 text-black" />
                </button>
            </div> */}

export default MusicCard;