import React, { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "@/api/axios";
import { setAccessToken, clearAccessToken, getAccessToken } from "@/services/TokenStore";

// =======================
// Типы контекста
// =======================
interface AuthContextType {
  userName: string | null;
  userEmail: string | null;
  userPicture: string | null;
  isEmailVerified: boolean;
  passwordSet: boolean;

  login: (accessToken: string, name: string, email: string, picture?: string) => Promise<void>;
  logout: () => void;
  setEmailVerified: (verified: boolean) => void;
  updateUserPicture: (picture: string) => void;
  setPasswordSet: (isSet: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =======================
// Провайдер
// =======================
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  // Состояния пользователя
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));
  const [userPicture, setUserPicture] = useState<string | null>(localStorage.getItem("userPicture"));
  const [isEmailVerified, setIsEmailVerified] = useState(localStorage.getItem("isEmailVerified") === "true");
  const [passwordSet, setPasswordSetState] = useState(localStorage.getItem("passwordSet") === "true");

  // =======================
  // Функция logout
  // =======================
  const logout = async () => {
    try { await api.post("/Auth/logout", {}); } catch { /* ignore */ }

    setUserName(null);
    setUserEmail(null);
    setUserPicture(null);
    setIsEmailVerified(false);
    setPasswordSetState(false);

    ["userName","userEmail","userPicture","isEmailVerified","passwordSet"].forEach((k)=>localStorage.removeItem(k));
    clearAccessToken();

    window.dispatchEvent(new CustomEvent("userLogout"));
    navigate("/");
  };

  // =======================
  // Функция login
  // =======================
  const login = async (token: string, name: string, email: string, picture?: string) => {
    setAccessToken(token);

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setUserName(name);
    setUserEmail(email);

    if (picture) {
      localStorage.setItem("userPicture", picture);
      setUserPicture(picture);
    }

    try {
      const passRes = await api.get("/Account/HasPassword");
      const hasPassword = !!passRes.data?.hasPassword ?? !!passRes.data?.data?.hasPassword;
      setPasswordSetState(hasPassword);
      localStorage.setItem("passwordSet", String(hasPassword));
    } catch { /* empty */ }

    try {
      const verifyRes = await api.get("/Account/VerificationStatus");
      const verified = !!verifyRes.data?.isEmailVerified ?? !!verifyRes.data?.data?.isEmailVerified;
      setIsEmailVerified(verified);
      localStorage.setItem("isEmailVerified", String(verified));
      if (!verified) navigate("/verify-email");
    } catch { /* empty */ }

    window.dispatchEvent(new CustomEvent("userLogin", { detail: { userName: name, userEmail: email, userPicture: picture } }));
  };

  // =======================
  // Хелперы
  // =======================
  const setEmailVerified = (verified: boolean) => {
    setIsEmailVerified(verified);
    localStorage.setItem("isEmailVerified", String(verified));
  };

  const updateUserPicture = (picture: string) => {
    setUserPicture(picture);
    localStorage.setItem("userPicture", picture);
    window.dispatchEvent(new CustomEvent("userPictureUpdate", { detail: { userPicture: picture } }));
  };

  const setPasswordSet = (isSet: boolean) => {
    setPasswordSetState(isSet);
    localStorage.setItem("passwordSet", String(isSet));
  };

  // =======================
  // Слушатели событий (для синхронизации вкладок)
  // =======================
  useEffect(() => {
    const handleLogin = (e: Event) => {
      const detail = (e as CustomEvent<{ userName: string; userEmail: string; userPicture?: string }>).detail;
      if (!detail) return;

      setUserName(detail.userName);
      setUserEmail(detail.userEmail);

      if (detail.userPicture) setUserPicture(detail.userPicture);
    };

    const handleLogout = () => {
      setUserName(null);
      setUserEmail(null);
      setUserPicture(null);
      setIsEmailVerified(false);
      setPasswordSetState(false);
    };

    const handlePictureUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ userPicture: string }>).detail;
      if (detail) setUserPicture(detail.userPicture);
    };

    window.addEventListener("userLogin", handleLogin as EventListener);
    window.addEventListener("userLogout", handleLogout);
    window.addEventListener("userPictureUpdate", handlePictureUpdate as EventListener);

    return () => {
      window.removeEventListener("userLogin", handleLogin as EventListener);
      window.removeEventListener("userLogout", handleLogout);
      window.removeEventListener("userPictureUpdate", handlePictureUpdate as EventListener);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userName,
        userEmail,
        userPicture,
        isEmailVerified,
        passwordSet,
        login,
        logout,
        setEmailVerified,
        updateUserPicture,
        setPasswordSet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =======================
// Хук для использования контекста
// =======================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
