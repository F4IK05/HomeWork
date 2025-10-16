import { Search } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { useResponsiveUI } from "@/hooks/useResponsiveUI";

interface SearchBarProps {
  isMobile: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile }) => {
  const { isSearchOpen, setIsSearchOpen } = useResponsiveUI();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Закрытие при клике вне поиска
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobile &&
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSearchOpen, setIsSearchOpen]);

  // Фокус при открытии
  useEffect(() => {
    if (isSearchOpen && isMobile) inputRef.current?.focus();
  }, [isSearchOpen, isMobile]);

  return (
    <div
      ref={searchRef}
      className="relative flex flex-1 items-center min-w-0 max-w-lg transition-all duration-300"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className={`bg-[#171719] p-2 px-5 pl-10 rounded-full transition-all duration-300 ease-in-out
          ${isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
      />
      <button
        onClick={() => isMobile && setIsSearchOpen((v) => !v)}
        className={`absolute left-1 rounded-full transition-all
          ${isMobile ? "cursor-pointer" : ""}
          ${isSearchOpen ? "bg-[#1e1e22] p-2" : "bg-[#171719] p-4"}`}
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
