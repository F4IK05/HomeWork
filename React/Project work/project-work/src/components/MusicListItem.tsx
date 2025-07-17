import { Play } from "lucide-react";

interface MusicCardData {
    title: string;
    subtitle: string;
    imageUrl: string;
}

const MusicListItem: React.FC<MusicCardData> = ({ title, subtitle, imageUrl }) => {

    return (
        <div className="relative flex items-center p-3 hover:bg-[#2a2a2e] transition-all group">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-zinc-800">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />

            </div>

            <div className="ml-3 flex flex-col">
                <h3 className="text-white text-sm font-medium truncate">{title}</h3>
                <p className="text-gray-400 text-xs truncate">{subtitle}</p>
            </div>

            <button className="absolute right-3 ml-2 p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
                <Play className="w-4 h-4 text-white" />
            </button>
        </div>
    );
};

export default MusicListItem;