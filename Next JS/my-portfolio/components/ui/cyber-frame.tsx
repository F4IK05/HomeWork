"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CyberFrameProps {
  children: ReactNode;
  className?: string;
  
  // Визуальные настройки
  cornerSize?: "sm" | "md" | "lg";
  cornerColor?: string;     // Цвет уголков (акцент)
  backgroundColor?: string; // Цвет фона контейнера
  borderColor?: string;     // Цвет основной тонкой рамки
  
  // Отступы и расположение
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  corners?: "all" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top" | "bottom" | "none";
  
  // Дополнительно
  interactive?: boolean; // Добавляет эффект при наведении
}

export function CyberFrame({
  children,
  className,
  cornerSize = "md",
  cornerColor = "border-voltage", // По дефолту желтый (из твоего конфига)
  backgroundColor = "bg-black",
  borderColor = "border-voltage/20",
  padding = "md",
  corners = "all",
  interactive = false,
}: CyberFrameProps) {

  const sizeClasses = {
    sm: "w-2 h-2 border-2",
    md: "w-4 h-4 border-2",
    lg: "w-8 h-8 border-4"
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
    xl: "p-12"
  };

  const showCorner = (position: "tl" | "tr" | "bl" | "br") => {
    if (corners === "all") return true;
    if (corners === "none") return false;
    
    if (corners === "top" && (position === "tl" || position === "tr")) return true;
    if (corners === "bottom" && (position === "bl" || position === "br")) return true;
    
    if (corners === "top-left" && position === "tl") return true;
    if (corners === "top-right" && position === "tr") return true;
    if (corners === "bottom-left" && position === "bl") return true;
    if (corners === "bottom-right" && position === "br") return true;
    
    return false;
  };

  return (
    <div 
      className={cn(
        "relative", 
        backgroundColor, 
        "border", 
        borderColor, 
        paddingClasses[padding], 
        interactive && "group hover:border-voltage/50 transition-colors duration-300",
        className
      )}
    >
      {/* Top Left */}
      {showCorner("tl") && (
        <div className={cn("absolute -top-[2px] -left-[2px] border-b-0 border-r-0 z-20", sizeClasses[cornerSize], cornerColor)} />
      )}

      {/* Top Right */}
      {showCorner("tr") && (
        <div className={cn("absolute -top-[2px] -right-[2px] border-b-0 border-l-0 z-20", sizeClasses[cornerSize], cornerColor)} />
      )}

      {/* Bottom Left */}
      {showCorner("bl") && (
        <div className={cn("absolute -bottom-[2px] -left-[2px] border-t-0 border-r-0 z-20", sizeClasses[cornerSize], cornerColor)} />
      )}

      {/* Bottom Right */}
      {showCorner("br") && (
        <div className={cn("absolute -bottom-[2px] -right-[2px] border-t-0 border-l-0 z-20", sizeClasses[cornerSize], cornerColor)} />
      )}

      {/* --- CONTENT --- */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      
    </div>
  );
}