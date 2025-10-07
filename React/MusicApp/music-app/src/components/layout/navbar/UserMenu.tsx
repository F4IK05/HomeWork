import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

interface UserMenuProps {
  userName?: string | null;
  userPicture?: string | null;
  t: (key: string) => string;
  logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  userName,
  userPicture,
  t,
  logout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="flex items-center gap-3">
      {userName ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-10 h-10 rounded-full overflow-hidden hover:scale-[1.04] active:scale-[0.95] transition-all"
          >
            <img
              src={userPicture || "/default-avatar.png"}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 bg-[#2a2a2e] border border-gray-600 rounded-lg shadow-lg py-2 min-w-[150px] z-100">
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
                {userName}
              </div>
              <Link
                to="/account"
                className="px-4 py-2 text-sm text-white hover:bg-[#3a3a3e] flex items-center gap-2"
              >
                <User className="w-4 h-4" /> {t("account")}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 text-sm text-white hover:bg-[#3a3a3e] flex items-center gap-2 w-full"
              >
                <LogOut className="w-4 h-4" /> {t("logout")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/sign-up" className="font-bold hover:text-gray-400 transition-all">
            {t("sign_up")}
          </Link>
          <Link
            to="/sign-in"
            className="bg-white text-black rounded-full font-bold px-5 py-2 hover:scale-[1.04] transition-all"
          >
            {t("sign_in")}
          </Link>
        </>
      )}
    </div>
  );
};

export default UserMenu;
