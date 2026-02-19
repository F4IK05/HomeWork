"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
    "INITIALIZING BIOS...",
    "CHECKING CPU... OK",
    "CHECKING RAM... OK",
    "LOADING KERNEL MODULES...",
    "> MOUNTING VOLUMES...",
    "> CONNECTING TO NEURAL NET...",
    "ACCESS GRANTED."
];

const welcomeMessage = "WELCOME!";

interface BootScreenProps {
    onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [welcomeText, setWelcomeText] = useState(""); 
    const [showWelcome, setShowWelcome] = useState(false); // для переключения фаз

    useEffect(() => {
        const runSequence = async () => {
            for (let i = 0; i < bootLines.length; i++) {
                const line = bootLines[i];
                setLines((prev) => [...prev, ""]);

                for (let j = 0; j < line.length; j++) {
                    await new Promise((r) => setTimeout(r, Math.random() * 20 + 5));
                    setLines((prev) => {
                        const newLines = [...prev];
                        newLines[i] = line.slice(0, j + 1);
                        return newLines;
                    });
                }
                await new Promise((r) => setTimeout(r, 50));
            }

            // Пауза перед очисткой терминала
            await new Promise((r) => setTimeout(r, 600));
            setShowWelcome(true); // Переключаем экран

            // WELCOME USER
            await new Promise((r) => setTimeout(r, 500)); // задержка перед стартом печати

            for (let i = 0; i < welcomeMessage.length; i++) {
                await new Promise((r) => setTimeout(r, 100)); // Печатаем медленнее и эпичнее
                setWelcomeText(welcomeMessage.slice(0, i + 1));
            }

            // Финальная пауза перед входом на сайт
            await new Promise((r) => setTimeout(r, 2000));
            onComplete();
        };

        runSequence();
    }, [onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black text-green-500 font-mono overflow-hidden cursor-none"
        >

            <AnimatePresence mode="wait">
                {!showWelcome ? (
                    <motion.div
                        key="terminal"
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                        transition={{ duration: 0.5 }}
                        className="h-full p-10 flex flex-col pb-20 max-w-2xl mx-auto relative z-10"
                    >
                        {lines.map((line, index) => (
                            <div key={index} className="mb-1 text-lg md:text-xl leading-tight">
                                <span className="opacity-50 mr-4 select-none text-sm">
                                    {`>_`}
                                </span>
                                {line}
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, letterSpacing: "5px" }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full flex items-center justify-center relative z-10 p-4"
                    >
                        <h1 className="text-5xl md:text-9xl text-center ">
                            {welcomeText}
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}