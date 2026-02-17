import Image from "next/image";

export default function Desert() {
    return (
        <section className="relative w-full min-h-[500px] md:min-h-[1000px] overflow-hidden rounded-xl bg-black">
            <div className="absolute inset-0">
                <Image
                    src="/hisma-desert.jpg"
                    alt="Hisma Desert"
                    fill
                    className="object-cover"
                    priority
                />
                
                <Image
                    src="/shadow.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 lg:p-16 min-h-[500px] md:min-h-[903px]">
                <div className="w-full mx-auto relative md:top-30">
                    <div className="relative flex flex-row items-end justify-between mb-5">
                        <div className="flex flex-col">
                            <h3 className="text-white text-4xl md:text-6xl font-serif italic leading-none ml-1">
                                Hisma
                            </h3>
                            <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.8]">
                                Desert
                            </h2>
                        </div>

                        <div className="flex items-center gap-3 pb-2">
                            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 shadow-xl">
                                <Image
                                    src="/abdul.png"
                                    alt="Wazeem Al Mulk"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-white">
                                <p className="font-semibold text-xs md:text-sm leading-tight">Wazeem Al Mulk</p>
                                <p className="text-[10px] md:text-xs text-gray-400">Traveler</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm md:text-lg lg:text-xl leading-snug font-light max-w-full opacity-90 pt-2">
                        The Hisma Desert in Saudi Arabia is a realm of ethereal beauty that captivates the senses. 
                        Its vast expanse of golden sand dunes, sculpted by the winds of time, creates a 
                        mesmerizing landscape that stretches as far as the eye can see. As the sun sets, 
                        painting the sky with vivid hues.
                    </p>
                </div>
            </div>
        </section>
    );
}