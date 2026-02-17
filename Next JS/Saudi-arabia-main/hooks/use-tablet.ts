'use client';

import { useEffect, useState } from "react";

const TABLET_BREAKPOINT = 1024;

export function useTablet() {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return

        const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
        
        // Устанавливаем начальное значение после монтирования
        setIsTablet(mql.matches);
        
        const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);

        mql.addEventListener('change', handler);

        return () => mql.removeEventListener('change', handler);
    }, [])

    return isTablet;

}