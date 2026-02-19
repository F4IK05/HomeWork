"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { DitherImage } from "../ui/dither-image";
import { CyberFrame } from "../ui/cyber-frame";

export function HeroVoltage() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br via-yellow-200  leading-[0.9]">
              RAW<br />
              POWER<br />
              <span className="text-white outline-text">UNLEASHED</span>
            </h1>
            <div className="absolute -top-10 -left-10 text-[10rem] -z-10 select-none">
              ⚡
            </div>
          </div>

          <p className="font-mono text-lg max-w-md border-l-2 pl-4">
            {">"} WARNING: High voltage electronics inside.<br/>
            Premium components for those building the future. Available only to authorized personnel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/about" className="px-8 py-4 border font-mono uppercase tracking-wider transition-colors text-center">
               SYSTEM_SPECS
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 text-[10px] font-mono pt-8 border-t">
             <div>
                VOLTAGE: 220V<br/>
                CURRENT: 15A
             </div>
             <div>
                FREQ: 60HZ<br/>
                PHASE: DUAL
             </div>
             <div>
                UPTIME: 99.9%<br/>
                ERRORS: 0
             </div>
          </div>
        </div>


        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="relative h-[400px] md:h-[600px] w-full group"
        >
           <div className="absolute -inset-1 bg-hazard-stripes opacity-20 group-hover:opacity-40 transition-opacity duration-500 clip-path-polygon" />
           
           <CyberFrame 
             className="h-full w-full"
           >
              <div className="h-full w-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <DitherImage 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" // Замени на фото микросхемы или кибер-девайса
                    secondaryColor="#FACC15"
                    gridSize={3}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent animate-scan" />
              </div>

              <div className="absolute bottom-4 left-4 bg-black/80 border px-2 py-1 text-xs font-mono">
                 FIG. 01: NEURAL_CHIP_V4
              </div>
           </CyberFrame>
        </motion.div>

      </div>
      <div className="absolute bottom-0 left-0 w-full bg-voltage text-black font-mono text-xs py-1 overflow-hidden whitespace-nowrap border-t-2 border-black">
         <div className="animate-marquee inline-block">
            WARNING: HIGH VOLTAGE /// AUTHORIZED PERSONNEL ONLY /// DO NOT TOUCH EXPOSED WIRES /// SYSTEM OVERLOAD IMMINENT /// 
            WARNING: HIGH VOLTAGE /// AUTHORIZED PERSONNEL ONLY /// DO NOT TOUCH EXPOSED WIRES /// SYSTEM OVERLOAD IMMINENT /// 
         </div>
      </div>
    </section>
  );
}