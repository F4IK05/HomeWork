import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useSideBar } from "@/hooks/useSideBar";
import { useAuth } from "@/hooks/useAuth";
import { useResponsiveUI } from "@/hooks/useResponsiveUI";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const NavBar: React.FC = () => {
  const { isOpen, setIsOpen } = useSideBar();
  const { userName, userPicture, logout } = useAuth();
  const { isMobile } = useResponsiveUI();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-[#1e1e22] text-white flex justify-between items-center p-4 transition-all gap-5 select-none shadow-lg
        ${isMobile ? "left-0" : isOpen ? "left-64" : "left-16"}`}
    >
      {/* Кнопка меню (только для мобильных) */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="transition-transform cursor-pointer hover:scale-[1.1] active:scale-[0.95]"
        >
          <Menu className="text-white w-8 h-8 p-1.5" />
        </button>
      )}

      {/* Поиск */}
      <SearchBar
        isMobile={isMobile}
      />

      {/* Меню пользователя */}
      {!isMobile ? (
        <UserMenu
          userName={userName}
          userPicture={userPicture}
          t={t}
          logout={logout}
        />
      ) : (
        <MobileMenu
          userName={userName}
          userPicture={userPicture}
          t={t}
          logout={logout}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </header>
  );
};

export default NavBar;
