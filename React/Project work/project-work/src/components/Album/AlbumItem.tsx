import React from "react"
import { useNavigate } from "react-router-dom";
import type { AlbumData } from "@/assets/data/AlbumData";

interface AlbumItemProps {
    album: AlbumData;
}


const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/album/${album.id}`)}
            className="p-2 px-3 relative aspect-[3/4] rounded-md hover:bg-[#2a2a2e] shadow-md cursor-pointer"
        >
            <img src={album.coverUrl} alt={album.title}/>

            <div className="absolute bottom-0 left-0 w-full h-[30%] overflow-hidden">
                <div className="absolute w-full p-2 flex flex-col font-semibold text-white">
                    <h3 className="font-bold text-white md:text-sm lg:text-base truncate">{album.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{album.artist}</p>
                </div>
            </div>
        </div>
    )
}

export default AlbumItem;