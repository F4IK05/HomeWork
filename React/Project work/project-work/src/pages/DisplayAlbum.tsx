import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import songs from "@/assets/data/SongData";
import albums from "@/assets/data/AlbumData";

const DisplayAlbum: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // для получения параметра из url
    const albumData = albums[id];

    return (
        <>
            <div className="mt-5">
                <button className="bg-[#1e1e22] p-3 md:p-2 rounded-full hover:bg-[#2a2a2e] transition-all " onClick={() => navigate('/')}>
                    <ChevronLeft className="w-7 h-7 md:w-5 md:h-5 text-white" />
                </button>

                <div className="mt-5 flex flex-col md:flex-row gap-10 text-white">
                    <div className="min-w-50 rounded overflow-hidden m-auto md:m-0">
                        <img className="w-60 md:w-50" src={albumData.coverUrl} alt="" />

                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="hidden md:block uppercase tracking-wide">Album</p>
                        <p className="text-3xl sm:text-3xl md:text-5xl font-bold text-wrap">{albumData.title}</p>
                        <p className="font-semibold text-sm md:text-base text-gray-300 md:hidden cursor-pointer hover:underline">{albumData.artist}</p>
                        <p className="font-semibold text-sm md:text-base text-gray-300 flex items-center gap-2">

                            <img className="w-10 rounded-full hidden md:inline" src={albumData.artistImgUrl} alt="" />
                            <span className="hidden md:inline cursor-pointer hover:underline">{albumData.artist}</span> <span className="md:hidden">Album</span> • {albumData.releaseYear}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 text-gray-400 mt-5 mb-2 pl-2">
                <p><b className="mr-5">#</b>Title</p>
                <p className="flex justify-end">Plays</p>
                <p className="m-auto"><Clock className="w-4" /></p>
            </div>
            <Separator className="bg-gray-400" />

            <div className="mb-10">
                {songs.filter(song => song.albumId === albumData.id)
                .map((song, index) => (
                    song.albumId === albumData.id && (
                        <div key={index} className="grid grid-cols-3 text-white hover:bg-[#2a2a2e] py-5">
                            <p className="pl-2 text-nowrap">
                                <b className="mr-5">{index + 1}</b>
                                {song.title}
                            </p>
                            <p className="flex justify-end mr-3">-</p>
                            <p className="m-auto">{song.duration}</p>
                        </div>
                    )

                ))}
            </div>
            
        </>

    )
}

export default DisplayAlbum;