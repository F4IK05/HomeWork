"use client";
import { motion } from "framer-motion";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

interface WelcomeSectionProps {
  text: string;
  words: string[];
  description?: string;
  duration?: number;
}

export function WelcomeSection({ 
  text, 
  words, 
  description = "Experience the power of modern UI components that bring your ideas to life.",
  duration = 3000 
}: WelcomeSectionProps) {
  return (
    <>
      <motion.div 
        className="relative mx-20 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <LayoutTextFlip
          text={text}
          words={words}
          duration={duration}
        />
      </motion.div>
      
      <motion.p 
        className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {description}
      </motion.p>
    </>
  );
}