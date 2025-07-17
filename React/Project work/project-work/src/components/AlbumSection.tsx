import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AlbumItem from "./AlbumItem";

interface AlbumItemData {
    albumImgUrl: string;
    albumName: string;
    albumDesc?: string;
    albumId?: number;
}

interface AlbumSectionProps {
    sectionTitle?: string;
    albums: AlbumItemData[];
}

const AlbumSection: React.FC<AlbumSectionProps> = ({ albums, sectionTitle }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <div className="w-full mt-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">{sectionTitle}</h2>
                    <div className="flex gap-1">
                        <button
                            ref={prevRef}
                            className={`bg-[#1e1e22] p-1 rounded-full hover:bg-[#2a2a2e] transition-all ${isBeginning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                                }`}
                            disabled={isBeginning}
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            ref={nextRef}
                            className={`bg-[#1e1e22] p-1 rounded-full hover:bg-[#2a2a2e] transition-all ${isEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                                }`}
                            disabled={isEnd}
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        if (prevRef.current && nextRef.current) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onInit={(swiper) => {
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        481: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 7,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {albums.map((album, index) => (
                        <SwiperSlide key={index}>
                            <AlbumItem {...album}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default AlbumSection