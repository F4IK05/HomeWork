import React from "react"
import { useNavigate } from "react-router-dom";

interface AlbumItemProps {
    albumImgUrl: string;
    albumName: string;
    albumDesc?: string;
    albumId?: number; // временно
}


const AlbumItem: React.FC<AlbumItemProps> = ({albumImgUrl, albumName, albumDesc, albumId}) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/album/${albumId}`)} className="p-2 px-3 rounded cursor-pointer hover:bg-[#2a2a2e]">
            <img className="rounded" src={albumImgUrl} alt={albumName} />
            <p className="font-bold text-white ">{albumName}</p>
            <p className="text-gray-400 text-sm">{albumDesc}</p>
        </div>
    )
}

export default AlbumItem;