"use client";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { DitherImage } from "./dither-image";
import gsap from "gsap";

interface BootScreenProps {
    onComplete: () => void;
    gridSize?: number;
}

export function BootScreen({ onComplete, gridSize = 50 }: BootScreenProps) {
    const [phase, setPhase] = useState<"logo" | "flash" | "reveal" | "done">("logo");
    const flashRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const logoRef = useRef<HTMLDivElement>(null);
    const logoIconRef = useRef<HTMLDivElement>(null);

    // Вычисляем количество колонок/строк по размеру окна
    const [grid, setGrid] = useState({ cols: 0, rows: 0 });

    useEffect(() => {
        const cols = Math.ceil(window.innerWidth / gridSize);
        const rows = Math.ceil(window.innerHeight / gridSize);
        setGrid({ cols, rows });
    }, [gridSize]);

    // Предвычисляем порядок раскрытия ячеек от центра (группы волн)
    const revealOrder = useMemo(() => {
        if (grid.cols === 0 || grid.rows === 0) return [];

        const centerX = grid.cols / 2;
        const centerY = grid.rows / 2;

        const cells: { col: number; row: number; dist: number }[] = [];
        for (let r = 0; r < grid.rows; r++) {
            for (let c = 0; c < grid.cols; c++) {
                const dx = c - centerX;
                const dy = (r - centerY) * (grid.cols / grid.rows);
                const dist = Math.sqrt(dx * dx + dy * dy);
                cells.push({ col: c, row: r, dist });
            }
        }

        cells.sort((a, b) => a.dist - b.dist);

        // Группируем по «волнам»
        const waves: { col: number; row: number }[][] = [];
        let currentDist = -1;
        for (const cell of cells) {
            const rounded = Math.floor(cell.dist * 1.2);
            if (rounded !== currentDist) {
                currentDist = rounded;
                waves.push([]);
            }
            waves[waves.length - 1].push({ col: cell.col, row: cell.row });
        }

        // Рандомизация внутри каждой волны
        for (const wave of waves) {
            for (let i = wave.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [wave[i], wave[j]] = [wave[j], wave[i]];
            }
        }

        return waves;
    }, [grid]);

    const startFlash = useCallback(() => {
        setPhase("flash");
    }, []);

    const startReveal = useCallback(() => {
        if (revealOrder.length === 0) return;
        setPhase("reveal");
    }, [revealOrder]);

    // GSAP анимация лого
    useEffect(() => {
        if (phase !== "logo" || !logoRef.current || !logoIconRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Появление
            tl.fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
            tl.fromTo(logoIconRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "<");

            // Пульсация (2 цикла)
            tl.to(logoIconRef.current, {
                opacity: 0.7,
                duration: 0.6,
                repeat: 1,
                yoyo: true,
                ease: "sine.inOut",
            }, "+=0.2");

            // Увеличение
            tl.to(logoIconRef.current, {
                scale: 15,
                duration: 0.8,
                ease: "power3.in",
            }, "+=0.1");

            // Одновременно заливаем фон зелёным
            tl.to(logoRef.current, {
                backgroundColor: "#22c55e",
                duration: 0.4,
                ease: "power2.in",
            }, "-=0.4");

            tl.call(() => {
                startFlash();
            });
        });

        return () => ctx.revert();
    }, [phase, startFlash]);

    // GSAP анимация зелёной вспышки
    useEffect(() => {
        if (phase !== "flash" || !flashRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Короткая пауза на зелёном экране
            tl.to(flashRef.current, {
                duration: 0.3,
            });

            tl.call(() => {
                startReveal();
            });
        });

        return () => ctx.revert();
    }, [phase, startReveal]);

    // GSAP анимация раскрытия сетки
    useEffect(() => {
        if (phase !== "reveal" || revealOrder.length === 0) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setPhase("done");
                onComplete();
            },
        });

        // Каждая волна — stagger-группа с небольшой задержкой между волнами
        for (let w = 0; w < revealOrder.length; w++) {
            const wave = revealOrder[w];
            const elements = wave
                .map((cell) => cellRefs.current.get(`${cell.col}-${cell.row}`))
                .filter(Boolean);

            if (elements.length === 0) continue;

            tl.to(
                elements,
                {
                    opacity: 0,
                    duration: 0.15,
                    stagger: {
                        each: 0.01,
                        from: "random",
                    },
                    ease: "power2.out",
                },
                w * 0.03 // задержка между волнами
            );
        }
    }, [phase, revealOrder, onComplete]);

    // startReveal вызывается из GSAP timeline лого

    const setCellRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
        if (el) {
            cellRefs.current.set(key, el);
        }
    }, []);

    if (phase === "done") return null;

    return (
        <div className="fixed inset-0 z-9999 pointer-events-none">
            {/* Лого по центру */}
            {phase === "logo" && (
                <div
                    ref={logoRef}
                    className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
                    style={{ opacity: 0 }}
                >
                    <div
                        ref={logoIconRef}
                        className="w-24 h-24 md:w-32 md:h-32"
                    >
                        <DitherImage
                            src="/voltage.png"
                            gridSize={2}
                            ditherMode="bayer"
                            colorMode="duotone"
                            secondaryColor="#22c55e"
                            className="w-full h-full"
                            animated={true}
                            animationSpeed={0.02}
                            brightness={1}
                            pixelRatio={0.5}
                        />
                    </div>
                </div>
            )}

            {/* Зелёная вспышка */}
            {phase === "flash" && (
                <div
                    ref={flashRef}
                    className="fixed inset-0 z-9999"
                    style={{ backgroundColor: "#22c55e" }}
                />
            )}

            {/* Пиксельная сетка-маска, совпадающая с TerminalGridBackground */}
            {phase === "reveal" && grid.cols > 0 && (
                <div
                    ref={gridRef}
                    className="fixed inset-0 z-9999"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${grid.cols}, ${gridSize}px)`,
                        gridTemplateRows: `repeat(${grid.rows}, ${gridSize}px)`,
                    }}
                >
                    {Array.from({ length: grid.rows }, (_, row) =>
                        Array.from({ length: grid.cols }, (_, col) => {
                            const key = `${col}-${row}`;
                            return (
                                <div
                                    key={key}
                                    ref={setCellRef(key)}
                                    style={{ backgroundColor: "#22c55e" }}
                                />
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}