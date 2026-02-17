import Hero from "@/components/ui/hero";
import { CarouselSlider } from "./carousel";
import Destenations from "../../components/destenations";
import Desert from "./desert";
import SectionBanner from "@/components/ui/section-banner";

export default function HomePage() {
    return (
        <div className="bg-black">
            <Hero image="/explore.jpg" shadow title="Explore Saudi Arabia" description="Saudi Arabia is rich in heritage and history. The country is home to hundreds of historically important sites." />
            <CarouselSlider />
            <Destenations />
            <Desert />
            <SectionBanner 
                title={`Explore\nSaudi Arabia`}
                image="/man.png" 
                href="/destenations"
            />
        </div>
    )
}