import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface TraditionItem {
    id: string;
    title: string;
    description: string;
    image: string;
    href?: string;
}

const traditions: TraditionItem[] = [
    {
        id: "language",
        title: "Language",
        description: "Arabic is the official language of Saudi Arabia and the primary language used in all dealings and public transactions. English serves as an informal second language in the Kingdom and is spoken by a large section of its society. All road signs are bilingual, showing information in both Arabic and English.",
        image: "/sand.png",
        href: "/traditions/language",
    },
    {
        id: "culture",
        title: "Culture",
        description: "Saudi Arabia's rich heritage and traditions have been shaped by its position as a historic trade hub and the birthplace of Islam. In recent years, the Kingdom has undergone a significant cultural transformation, evolving century-old customs to fit the contemporary world we live in today.",
        image: "/culture.png",
        href: "/traditions/culture",
    },
];

function TraditionCard({ 
    item, 
    reverse = false 
}: { 
    item: TraditionItem; 
    reverse?: boolean;
}) {
    return (
        <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10`}>
            <div className="relative w-full md:w-[280px] lg:w-[604px] h-[350px] md:h-[556px] lg:h-[556px]  flex-shrink-0 rounded-2xl overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col justify-between items-center flex-1">
                <div>
                    <h3 className="text-white text-[40px] font-bold mb-4">
                        {item.title}
                    </h3>
                    <p className="text-gray-400 text-25px] leading-relaxed text-justify">
                        {item.description}
                    </p>
                </div>

                <div className={`mt-6 md:self-end`}>
                    <Link
                        href={item.href || "#"}
                        className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <ArrowRight className="w-5 h-5 text-white" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Traditions() {
    return (
        <section className="bg-black py-16 px-6 md:px-12 lg:px-16">
            <div className="container mx-auto">
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
                    Traditions of Saudi Arabia
                </h2>

                <div className="flex flex-col gap-16">
                    {traditions.map((item, index) => (
                        <TraditionCard 
                            key={item.id} 
                            item={item} 
                            reverse={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
