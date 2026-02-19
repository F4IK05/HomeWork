"use client";
import { DitherShader } from "@/components/ui/dither-shader";
import { cn } from "@/lib/utils";

interface DitherImageProps {
  src: string;
  alt?: string;
  className?: string;
  primaryColor?: string;   // цвет теней
  secondaryColor?: string; // цвет света
  gridSize?: number;       // размер пикселя
  ditherMode?: "bayer" | "halftone" | "noise" | "crosshatch";
  colorMode?: "original" | "grayscale" | "duotone" | "custom";
  invert?: boolean;
  animated?: boolean;
  animationSpeed?: number;
  threshold?: number;      // баланс между цветами
  objectFit?: "cover" | "contain" | "fill" | "none";
  brightness?: number;     // яркость (-1 до 1)
  contrast?: number;       // контраст (0 до 2)
  pixelRatio?: number;     // пикселизация
}

export function DitherImage({
  src,
  className,
  primaryColor = "#000000",
  secondaryColor = "#22c55e",
  gridSize = 3,
  ditherMode = "bayer",
  colorMode = "duotone",
  invert = false,
  animated = false,
  animationSpeed = 0.02,
  threshold = 0.5,
  objectFit = "cover",
  brightness = 0,
  contrast = 1,
  pixelRatio = 1,
}: DitherImageProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      
      <div 
        className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
            backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
            backgroundSize: "100% 4px"
        }} 
      />

      <DitherShader
        src={src}
        gridSize={gridSize}
        ditherMode={ditherMode}
        colorMode={colorMode}
        invert={invert}
        animated={animated}
        animationSpeed={animationSpeed}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        threshold={threshold}
        objectFit={objectFit}
        brightness={brightness}
        contrast={contrast}
        pixelRatio={pixelRatio}
        className="w-full h-full object-cover" // Растягиваем на весь контейнер
      />
    </div>
  );
}