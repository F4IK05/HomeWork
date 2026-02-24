"use client";
import { BootScreen } from "@/components/ui/boot-screen";
import { useLoading } from "@/components/providers/loading-provider";
import { TerminalGridBackground } from "@/components/ui/grid-background";
import { HeroVoltage } from "@/components/home/hero-voltage";
import { useEffect } from "react";

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("systemBooted");

    if (hasBooted) {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const handleBootComplete = () => {
    sessionStorage.setItem("systemBooted", "true");
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-black text-green-500 selection:bg-green-500 selection:text-black overflow-x-hidden">

      {isLoading && (
        <BootScreen onComplete={handleBootComplete} gridSize={50} />
      )}

      {(
        <TerminalGridBackground
          containerClassName="min-h-screen"
          gridSize={50}
        >
          <div className="mt-5">
            <div className="flex justify-center py-8">
              <HeroVoltage />
            </div>
          </div>
        </TerminalGridBackground>
      )}
    </main>
  );
}