"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface GridBackgroundProps {
  children?: ReactNode;
  className?: string;
  gridSize?: number;
  gridColors?: {
    light: string;
    dark: string;
  };
  fadeIntensity?: number;
  containerClassName?: string;
}

export function GridBackground({
  children,
  className,
  gridSize = 40,
  gridColors = {
    light: "#e4e4e7",
    dark: "#262626"
  },
  fadeIntensity = 100,
  containerClassName
}: GridBackgroundProps) {
  return (
    <div className={cn("relative flex w-full items-center justify-center", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0",
          className
        )}
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage: `linear-gradient(to right, ${gridColors.light} 1px, transparent 1px), linear-gradient(to bottom, ${gridColors.light} 1px, transparent 1px)`,
          '--dark-bg-image': `linear-gradient(to right, ${gridColors.dark} 1px, transparent 1px), linear-gradient(to bottom, ${gridColors.dark} 1px, transparent 1px)`
        } as React.CSSProperties}
      />

      <div 
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black"
        style={{
          maskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`
        }}
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export function TerminalGridBackground({ 
  children, 
  className,
  ...props 
}: Omit<GridBackgroundProps, 'gridColors'> & { className?: string }) {
  return (
    <GridBackground
      gridColors={{
        light: "#22c55e20",
        dark: "#22c55e40" 
      }}
      className={className}
      {...props}
    >
      {children}
    </GridBackground>
  );
}