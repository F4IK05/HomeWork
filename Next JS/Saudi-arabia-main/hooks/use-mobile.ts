'use client';

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return

        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        
        // Устанавливаем начальное значение после монтирования
        setIsMobile(mql.matches);
        
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        mql.addEventListener('change', handler);

        return () => mql.removeEventListener('change', handler);
    }, [])

    return isMobile;

}