import Link from "next/link";
import { DitherImage } from "../ui/dither-image";

export function Logo({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <Link href="/" className="group flex items-center" >
            <div className={`w-10 h-10 ${isMobile ? 'hidden' : ''}`}>
                <DitherImage
                    src="/voltage.png"
                    gridSize={2}
                    ditherMode="bayer"
                    colorMode="duotone"
                    secondaryColor="#22c55e"
                    className="w-full h-full"
                    animated={true}
                    animationSpeed={0.02}
                    brightness={1}
                />
            </div>

            <div className={`flex-col ${isMobile ? 'flex' : 'hidden sm:flex'}`}>
                <span className="text-xl font-mono text-green-500"
                    style={{
                        fontWeight: '900'
                    }}>
                    VOLTAGE
                </span>
            </div>
        </Link >
    );
}