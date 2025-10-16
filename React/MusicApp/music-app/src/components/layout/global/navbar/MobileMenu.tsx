import { X, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";

interface MobileMenuProps {
  userName?: string | null;
  userPicture?: string | null;
  t: (key: string) => string;
  logout: () => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  userName,
  userPicture,
  t,
  logout,
  isModalOpen,
  setIsModalOpen,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen, setIsModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex justify-center items-center cursor-pointer w-10 h-10 rounded-full overflow-hidden"
      >
        {userName ? (
          <img
            src={userPicture || "/default-avatar.png"}
            alt={userName}
            className="w-full h-full object-cover"
          />
        ) : (
          <User />
        )}
      </button>

      <div
        ref={modalRef}
        className={`fixed inset-0 bg-[#212124] z-50 p-4 transition-all
          ${isModalOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center justify-end">
          <button onClick={() => setIsModalOpen(false)} className="cursor-pointer">
            <X className="w-7 h-7 text-white" />
          </button>
        </div>

        <div className="flex flex-col items-start text-xl text-white font-semibold gap-5 mt-5">
          {userName ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={userPicture || "/default-avatar.png"}
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-gray-400 text-base font-normal">
                  {t("welcome")}, {userName}
                </div>
              </div>

              <Link to="/profile" className="flex items-center gap-2">
                <User className="w-6 h-6" /> {t("profile")}
              </Link>

              <button onClick={logout} className="flex items-center gap-2">
                <LogOut className="w-6 h-6" /> {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in">{t("sign_in")}</Link>
              <Link to="/sign-up">{t("sign_up")}</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
