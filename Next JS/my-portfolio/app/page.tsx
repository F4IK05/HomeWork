"use client";
import { AnimatePresence } from "framer-motion";
import { BootScreen } from "@/components/ui/boot-screen";
import { WelcomeSection } from "@/components/ui/welcome-section";
import { useLoading } from "@/components/providers/loading-provider";
import { DitherImage } from "@/components/ui/dither-image";
import { TerminalGridBackground } from "@/components/ui/grid-background";
import { HeroVoltage } from "@/components/home/hero-voltage";

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <main className="relative min-h-screen bg-black text-green-500 selection:bg-green-500 selection:text-black overflow-x-hidden">

      <AnimatePresence mode="wait">
        {isLoading && (
          <BootScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <TerminalGridBackground 
          containerClassName="absolute inset-0"
          gridSize={50}
        >
          <div className="pt-20">
            {/* <WelcomeSection
              text="Welcome to "
              words={["Aceternity UI", "Fight Club", "The Matrix", "The Jungle"]}
              description="Experience the power of modern UI components that bring your ideas to life."
            /> */}

            <div className="flex justify-center py-8">
              <HeroVoltage />
            </div>
          </div>
        </TerminalGridBackground>
      )}
    </main>
  );
}