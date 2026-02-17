"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeroProps {
    image: string;
    shadow?: boolean;
    title: string;
    description: string;
}
export default function Hero({image, shadow, title, description}: HeroProps) {
    const pathname = usePathname();

    return (
        <section className="z-0 min-h-[720px] px-10">
            <Image src={image} alt="explore" fill className="w-full min-h-[600px] lg:min-h-[982px] object-cover" />

            {shadow && 
                <Image src="/shadow2.png" alt="shadow" fill className="w-full min-h-[600px] lg:min-h-[982px] object-cover" />}
            <div className="container mx-auto relative z-10 flex flex-col items-center mt-[122px] h-full">
                <h1 className="text-[60px]  md:text-[98px] font-extrabold text-white max-w-[650px] text-center leading-14 lg:leading-[100px]">{title}</h1>
                <p className="text-white text-xl max-w-[576px] text-center">{description}</p>

                {(pathname === "/") && (
                    <div className="flex flex-col sm:flex-row justify-between mt-20 w-full">
                        <div className="flex flex-col gap-4 max-w-[331px]">
                            <h4 className="text-[32px] font-bold text-white">History and Heritage</h4>
                            <p className="text-white text-md max-w-[276px]">
                                Saudi Arabia has long occupied an
                                important role at the center of the
                                islamic and Arab worlds. Located at
                                the heart of three continents.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 max-w-[331px]">
                            <h4 className="text-[32px] font-bold text-white">People and Culture</h4>
                            <p className="text-white text-md max-w-[276px]">
                                Saudi Arabia has a rich Culture
                                Shaped by the diversity of its people.
                                which has formed the basis of its
                                cultural identity.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}