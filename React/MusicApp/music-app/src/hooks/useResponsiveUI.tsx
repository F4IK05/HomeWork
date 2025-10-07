import { useCallback, useEffect, useState } from "react";
import { useSideBar } from "@/hooks/useSideBar";

interface UseResponsiveUIResult {
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Централизованный хук управления адаптивным UI
 * — Sidebar, Navbar, модалки, поиск и т.п.
 */
export const useResponsiveUI = (): UseResponsiveUIResult => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSearchOpen, setIsSearchOpen] = useState(!isMobile);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsOpen: setSideBarOpen } = useSideBar();

  const handleResize = useCallback(() => {
    const mobileMode = window.innerWidth < 768;
    setIsMobile(mobileMode);

    if (mobileMode) {
      // При переходе на мобильный — всё закрываем
      setSideBarOpen(false);
      setIsSearchOpen(false);
      setIsUserMenuOpen(false);
      setIsModalOpen(false);
    } else {
      // При возвращении на ПК — открываем нужные элементы
      setSideBarOpen(true);
      setIsSearchOpen(true);
    }
  }, [setSideBarOpen]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return {
    isMobile,
    setIsMobile,
    isSearchOpen,
    setIsSearchOpen,
    isUserMenuOpen,
    setIsUserMenuOpen,
    isModalOpen,
    setIsModalOpen,
  };
};
