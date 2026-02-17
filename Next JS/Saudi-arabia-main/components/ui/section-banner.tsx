import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionBannerProps {
    title: string;
    image: string;
    href?: string;
    height?: "sm" | "md" | "lg";
}

const heightClasses = {
    sm: "h-[200px] md:h-[300px] lg:h-[350px]",
    md: "h-[300px] md:h-[400px] lg:h-[500px]",
    lg: "h-[400px] md:h-[500px] lg:h-[600px]",
};

export default function SectionBanner({ 
    title, 
    image, 
    href = "/destenations",
    height = "md" 
}: SectionBannerProps) {
    const titleLines = title.split("\n");

    return (
        <section className={`relative ${heightClasses[height]} overflow-hidden bg-black mx-6 md:mx-12 lg:mx-16`}>
            <div className="absolute top-0 left-0 right-0 h-8 md:h-12 bg-black z-20" />
            <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 bg-black z-20" />
            
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title.replace("\n", " ")}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-10 flex items-center justify-between h-full px-8 md:px-16 lg:px-24">
                <div>
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {titleLines.map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < titleLines.length - 1 && <br />}
                            </span>
                        ))}
                    </h2>
                </div>

                <Link 
                    href={href}
                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </Link>
            </div>
        </section>
    );
}
