import Hero from "@/components/ui/hero";
import { Metadata } from "next";
import DestenationsSection from "@/components/pages/components/destenations";
import SectionBanner from "@/components/ui/section-banner";

export const metadata: Metadata = {
    title: "Destenations",
    description: "Discover the country's hidden gems and breathtaking landscapes",
};

export default function DestenationsPage() {

    return (
        <div className="bg-black">
            <Hero
                image="/destenations.png"
                shadow
                title="Destenations"
                description="Saudi Arabia is rich in heritage and history. The country is 
                    home to hundreds of historically important sites." />

            <DestenationsSection />
            <SectionBanner
                title={`Make To Change\nNEOM`}
                image="/turtle.png"
                href="/neom"
            />
        </div>
    )
}