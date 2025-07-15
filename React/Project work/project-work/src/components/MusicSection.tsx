import { ChevronLeft, ChevronRight } from "lucide-react";
import MusicCard from "./MusicCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";

interface MusicCardData {
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface MusicSectionProps {
    sectionTitle?: string;
    cards: MusicCardData[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ sectionTitle, cards }) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className="w-full mx-auto mt-5">
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
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={2}
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
                    setIsBeginning(swiper.isBeginning); // true если на первом слайде
                    setIsEnd(swiper.isEnd); // true если на последнем слайде
                }}
                onInit={(swiper) => {
                    swiper.navigation.init(); // Инициализирует систему навигации
                    swiper.navigation.update(); // Обновляет состояние кнопок
                }}
                breakpoints={{
                    480: {
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
                        slidesPerView: 6,
                        spaceBetween: 24,
                    },
                }}
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index}>
                        <MusicCard {...card} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MusicSection;