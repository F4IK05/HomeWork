import { ChevronLeft, ChevronRight } from "lucide-react";
import MusicCard from "./MusicCard";
import MusicListItem from "./MusicListItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import type { SongData } from "@/assets/data/SongData";

interface MusicSectionProps {
  sectionTitle?: string;
  cards: SongData[];
}

function groupCardList(allMusic: SongData[], perPage: number) {
  const groups: SongData[][] = [];
  for (let i = 0; i < allMusic.length; i += perPage) {
    groups.push(allMusic.slice(i, i + perPage));
  }
  return groups;
}

const MusicSection: React.FC<MusicSectionProps> = ({ sectionTitle, cards }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 481);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 481);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full mt-6 select-none">
      {/* Заголовок и стрелки */}
      <div className="flex items-center justify-between mb-4">
        {sectionTitle && (
          <h2 className="text-xl font-semibold text-white">{sectionTitle}</h2>
        )}
        <div className="flex gap-2">
          <button
            ref={prevRef}
            className={`bg-[#1e1e22] p-1 rounded-full hover:bg-[#2a2a2e] transition-all ${
              isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={isBeginning}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            ref={nextRef}
            className={`bg-[#1e1e22] p-1 rounded-full hover:bg-[#2a2a2e] transition-all ${
              isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={isEnd}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Свайпер */}
      <Swiper
        modules={[Navigation]}
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
        breakpoints={{
          0: { slidesPerView: 1 },
          481: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }}
      >
    
        {isMobile
          ? groupCardList(cards, 5).map((group, gIndex) => (
              <SwiperSlide key={gIndex}>
                <div className="bg-[#1e1e22] rounded-lg overflow-hidden px-2 py-2">
                  {group.map((song) => (
                    <MusicListItem key={song.id} song={song} />
                  ))}
                </div>
              </SwiperSlide>
            ))
          : 
            cards.map((song) => (
              <SwiperSlide key={song.id}>
                <MusicCard song={song} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default MusicSection;
