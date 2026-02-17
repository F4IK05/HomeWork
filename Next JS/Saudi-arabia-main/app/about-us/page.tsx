import Traditions from "@/components/pages/about-us/components/traditions";
import SectionHeader from "@/components/pages/components/section-header";
import Hero from "@/components/ui/hero";
import SectionBanner from "@/components/ui/section-banner";

export default function AboutUs() {
    return (
        <div className="bg-black">
            <Hero
                image="/about-us.jpg"
                shadow
                title="About Us"
                description="Discover the country's hidden gems and breathtaking landscapes"
            />
            <SectionHeader
                title="Saudi, a kingdom that inspires"
                description="A uniquely Saudi experience awaits in winter"
            />
            <Traditions />
            <SectionBanner
                title={`Rules of Behavior\nKSA`}
                image="/rules.png"
                href="/rules"
            />
        </div>
    )
}