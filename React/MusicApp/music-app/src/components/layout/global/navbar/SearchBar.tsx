import { Search, Loader2, X } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { useResponsiveUI } from "@/hooks/useResponsiveUI";
import { searchAll, type SearchResultItemDto } from "@/api/search";
import { useNavigate } from "react-router-dom";

interface SearchBarProps { isMobile: boolean; }

const SearchBar: React.FC<SearchBarProps> = ({ isMobile }) => {
  const { isSearchOpen, setIsSearchOpen } = useResponsiveUI();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<SearchResultItemDto[]>([]);
  const [active, setActive] = useState(0); // для ↑/↓ выбора

  /* ──────────────────────────────────────────────────────────
     МОБАЙЛ: вычисляем положение "низа" поиска, чтобы показать
     список результатов точно под ним во fixed-оверлее.
     ────────────────────────────────────────────────────────── */
  const [mobileTop, setMobileTop] = useState<number>(0);
  useEffect(() => {
    if (!(isMobile && isSearchOpen)) return;
    const updateTop = () => {
      if (!searchRef.current) return;
      const r = searchRef.current.getBoundingClientRect();
      // +8px = та же mt-2
      setMobileTop(r.bottom + 8);
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    window.addEventListener("scroll", updateTop, true);
    return () => {
      window.removeEventListener("resize", updateTop);
      window.removeEventListener("scroll", updateTop, true);
    };
  }, [isMobile, isSearchOpen]);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isSearchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
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

  // Дебаунс
  useEffect(() => {
    if (!isSearchOpen) return;
    const term = q.trim();
    if (term.length < 2) { setItems([]); setLoading(false); return; }
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const data = await searchAll(term, 1, 8);
        setItems(data.items);
        setActive(0);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(id);
  }, [q, isSearchOpen]);

  // Клавиатура: Enter/↑/↓/Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;
      if (e.key === "Escape") { setIsSearchOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0))); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter") {
        e.preventDefault();
        // Переход на общую страницу результатов
        navigate(`/search?query=${encodeURIComponent(q.trim())}`);
        if (isMobile) setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSearchOpen, q, items.length, navigate, setIsSearchOpen, isMobile]);

  // клик по иконке (мобайл) или по элементу результата
  const goToResults = () => {
    if (!q.trim()) return;
    navigate(`/search?query=${encodeURIComponent(q.trim())}`);
    if (isMobile) setIsSearchOpen(false);
  };

  // МОБАЙЛ: полупрозрачный фон под списком результатов
  const MobileBackdrop = () =>
    isMobile && isSearchOpen ? (
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden
      />
    ) : null;

  return (
    <>
      <div
        ref={searchRef}
        className={`relative flex flex-1 items-center min-w-0 max-w-lg transition-all duration-300 ${isMobile && isSearchOpen ? "z-50" : ""}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search songs, artists, albums..."
          className={`bg-[#171719] p-2 px-5 pl-10 pr-10 rounded-full transition-all duration-300 ease-in-out
            ${isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
        />

        <button
          onClick={() => (isMobile ? setIsSearchOpen((v) => !v) : goToResults())}
          className={`absolute left-1 rounded-full transition-all ${isMobile ? "cursor-pointer" : ""} ${isSearchOpen ? "bg-[#1e1e22] p-2" : "bg-[#171719] p-4"}`}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>

        {/* МОБАЙЛ/ДЕСКТОП: крестик для очистки */}
        {isSearchOpen && q && (
          <button
            onClick={() => { setQ(""); inputRef.current?.focus(); }}
            className="absolute right-2 p-1 rounded-full text-white/60 hover:text-white"
            aria-label="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Выпадающий список подсказок */}
        {isSearchOpen && q.trim() && (
          <>
            {/* МОБАЙЛ: рисуем fixed-оверлей и панель результатов под поиском */}
            {isMobile ? (
              <>
                <MobileBackdrop />
                <div className="fixed inset-x-0 z-50 px-3" style={{ top: mobileTop }}>
                  <div className="w-full rounded-xl overflow-hidden bg-[#1b1b1f] ring-1 ring-white/10 shadow-xl">
                    {loading && <div className="px-4 py-3 text-sm text-white/60">Searching…</div>}
                    {!loading && items.length === 0 && <div className="px-4 py-3 text-sm text-white/60">No results</div>}
                    {!loading &&
                      items.map((it, idx) => (
                        <button
                          key={it.type + it.id}
                          onClick={() => { navigate(`/search?query=${encodeURIComponent(q.trim())}`); if (isMobile) setIsSearchOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/5 ${idx === active ? "bg-white/10" : ""}`}
                        >
                          <img
                            src={it.coverUrl}
                            className="h-8 w-8 rounded object-cover"
                          />
                          <div className="min-w-0">
                            <div className="text-sm truncate">{it.title}</div>
                            <div className="text-xs text-white/60 truncate">{it.subtitle ?? it.type}</div>
                          </div>
                          <span className="ml-auto text-[10px] uppercase text-white/40">{it.type}</span>
                        </button>
                      ))}
                    {/* Кнопка "See all results" */}
                    {!loading && items.length > 0 && (
                      <button
                        onClick={goToResults}
                        className="w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5 border-t border-white/10"
                      >
                        See all results
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // ДЕСКТОП: как было, только w-full
              <div className="absolute top-full mt-2 w-full z-50 rounded-xl overflow-hidden bg-[#1b1b1f] ring-1 ring-white/10 shadow-xl">
                {loading && <div className="px-4 py-3 text-sm text-white/60">Searching…</div>}
                {!loading && items.length === 0 && <div className="px-4 py-3 text-sm text-white/60">No results</div>}
                {!loading &&
                  items.map((it, idx) => (
                    <button
                      key={it.type + it.id}
                      onClick={() => { navigate(`/search?query=${encodeURIComponent(q.trim())}`); if (isMobile) setIsSearchOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/5 ${idx === active ? "bg-white/10" : ""}`}
                    >
                      <img
                        src={it.coverUrl}
                        className="h-8 w-8 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <div className="text-sm truncate">{it.title}</div>
                        <div className="text-xs text-white/60 truncate">{it.subtitle ?? it.type}</div>
                      </div>
                      <span className="ml-auto text-[10px] uppercase text-white/40">{it.type}</span>
                    </button>
                  ))}
                {/* Кнопка "See all results" */}
                {!loading && items.length > 0 && (
                  <button
                    onClick={goToResults}
                    className="w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5 border-t border-white/10"
                  >
                    See all results
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchBar;
