import { Menu, Search, User, X, LogOut } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSideBar } from "@/hooks/useSideBar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const NavBar: React.FC = () => {
  const { userName, logout, userPicture } = useAuth();
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useSideBar();

  const [isMobile, setIsMobile] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const mobileMode = window.innerWidth < 768;
    if (isMobile !== mobileMode) {
      setIsMobile(mobileMode);
      setIsInputOpen(!mobileMode);
      setIsModalOpen(false);
      setDropdownOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isInputOpen && searchRef.current && !searchRef.current.contains(e.target as Node) && isMobile) {
        setIsInputOpen(false);
      }
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node) && isMobile) {
        setIsModalOpen(false);
      }
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isInputOpen, isMobile, isModalOpen, dropdownOpen]);

  useEffect(() => {
    if (isInputOpen && isMobile) inputRef.current?.focus();
  }, [isInputOpen, isMobile]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setIsModalOpen(false);
  };

  console.log(userPicture);

  return (
    <>
      <div className={`fixed top-0 right-0 z-30 h-16 bg-[#1e1e22] text-white flex justify-between items-center p-4 transition-all gap-5 select-none
        ${isMobile ? "left-0" : isOpen ? "left-64" : "left-16"}`}>

        {isMobile && (
          <button onClick={() => setIsOpen(true)} className="transition-all cursor-pointer group hover:scale-[1.1]">
            <Menu className="text-white w-10 h-10 p-1.5" />
          </button>
        )}

        <div ref={searchRef} className="relative flex flex-1 items-center min-w-0 max-w-lg">
          <input
            type="text"
            placeholder={t("search") + "..."}
            ref={inputRef}
            className={`bg-[#171719] p-2 px-5 pl-10 rounded-full transition-all ${isInputOpen ? "w-full opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"}`}
          />
          <button onClick={() => isMobile && setIsInputOpen((val) => !val)}
            className={`absolute left-1 rounded-full ${isMobile ? "cursor-pointer" : ""} ${isMobile && !isInputOpen ? "p-4" : ""} ${isInputOpen ? "bg-[#1e1e22] p-2" : "bg-[#171719]"}`}>
            <Search className="w-4 h-4" />
          </button>
        </div>

        {!isMobile ? (
          <div className="flex items-center gap-2">
            {userName ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden font-bold text-white hover:scale-[1.04] active:scale-[0.95] cursor-pointer">
                  <img src={userPicture} alt={userName} className="w-full h-full object-cover" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 bg-[#2a2a2e] border border-gray-600 rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">{userName}</div>
                    <Link to="/account" className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#3a3a3e] transition-all flex items-center gap-2">
                      <User className="w-4 h-4" /> {t("account")}
                    </Link>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#3a3a3e] transition-all flex items-center gap-2">
                      <LogOut className="w-4 h-4" />{t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/sign_up" className="text-sm font-bold transition-all hover:text-gray-400 hover:scale-[1.04] active:scale-[0.95] p-1 tracking-wide text-nowrap cursor-pointer">
                  {t("sign_up")}
                </Link>
                <Link to="/sign_in" className="bg-white text-black rounded-full font-bold text-nowrap transition-all hover:scale-[1.04] active:scale-[0.95] p-2 px-5 cursor-pointer">
                  {t("sign_in")}
                </Link>
              </>
            )}
          </div>
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="flex justify-center items-center cursor-pointer w-10 h-10 rounded-full overflow-hidden">
            {userName ? (
              <img src={userPicture} alt={userName} className="w-full h-full object-cover" />

            ) : (
              <User />
            )}
          </button>
        )}
      </div>

      <div ref={modalRef} className={`fixed inset-0 bg-[#212124] z-9999 p-4 transform transition-all
        ${isModalOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}>
        <div className="flex items-center justify-end">
          <button onClick={() => setIsModalOpen(false)} className="cursor-pointer">
            <X className="w-7 h-7 text-white" />
          </button>
        </div>

        <div className="flex flex-col items-start text-xl text-white font-semibold gap-5 mt-5">
          {userName ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <img src={userPicture} alt={userName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="text-gray-400 text-base font-normal">
                    {t("welcome") || "Welcome"}, {userName}
                  </div>
                </div>
              </div>

              <Link to="/account" className="w-full text-left text-white flex items-center gap-2">
                <User className="w-6 h-6" />{t("account")}
              </Link>

              <button onClick={handleLogout} className="cursor-pointer flex items-center gap-2">
                <LogOut className="w-6 h-6" />{t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/sign_in" className="cursor-pointer">{t("sign_in")}</Link>
              <Link to="/sign_up" className="cursor-pointer">{t("sign_up")}</Link>
            </>
          )}
        </div>

        <hr className="my-10 w-5" />
      </div>
    </>
  );
};

export default NavBar;
