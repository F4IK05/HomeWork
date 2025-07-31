import { ChevronLeft, ChevronRight } from "lucide-react";
import MusicCard from "./MusicCard"; // Для desktop
import MusicListItem from "./MusicListItem";// Для mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import type { SongData } from "@/assets/data/SongData";


interface MusicSectionProps {
    sectionTitle?: string;
    cards: SongData[];
}

// Функция для группировки карточек в массивы по n элементов
function groupCardList(allMusic: SongData[], musicCountPerPage: number) {
    const grouped = [];
    for (let i = 0; i < allMusic.length; i += musicCountPerPage) {
        grouped.push(allMusic.slice(i, i + musicCountPerPage))
    }

    return grouped;
}

const MusicSection: React.FC<MusicSectionProps> = ({ sectionTitle, cards }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 481);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div className="w-full mt-5 select-none">
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
                            slidesPerView: 1,
                        },
                        481: {
                            slidesPerView: 4,
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
                    {isMobile ? (
                        groupCardList(cards, 5).map((group, gIndex) => (
                            <SwiperSlide key={gIndex}>
                                <div className="bg-[#1e1e22] rounded-lg overflow-hidden px-2 py-2">
                                    {group.map((song, index) => (
                                        <MusicListItem key={index} song={song}/>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        cards.map((song, index) => (
                            <SwiperSlide key={index}>
                                <MusicCard song={song} />
                            </SwiperSlide>
                        ))
                    )}


                </Swiper>

            </div>
        </>
    );
};

export default MusicSection;