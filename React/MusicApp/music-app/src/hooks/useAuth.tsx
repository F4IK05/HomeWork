import axios from "axios";
import React, { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// =======================
// Типы контекста
// =======================
interface AuthContextType {
  userName: string | null;
  userEmail: string | null;
  userPicture: string | null;
  isEmailVerified: boolean;
  passwordSet: boolean;

  login: (token: string, name: string, email: string, picture?: string) => Promise<void>;
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
  const API_URL = "http://localhost:5017/api";

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
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const decoded = jwtDecode<{ sub?: string }>(token);
        const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        // отправляем logout на сервер

        console.log("Logging out user:", userId);

        await axios.post(
          `${API_URL}/Auth/logout`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Logout request sent to backend");
      }
    } catch (err) {
      console.warn("Logout request failed (maybe expired):", err);
    } finally {
      // --- локальная очистка (то, что уже у тебя было) ---
      setUserName(null);
      setUserEmail(null);
      setUserPicture(null);
      setIsEmailVerified(false);
      setPasswordSetState(false);

      [
        "userName",
        "userEmail",
        "userPicture",
        "token",
        "tokenExpiration",
        "isEmailVerified",
        "passwordSet",
      ].forEach((key) => localStorage.removeItem(key));

      delete axios.defaults.headers.common["Authorization"];
      window.dispatchEvent(new CustomEvent("userLogout"));
      navigate("/");
    }
  };

  // =======================
  // Функция login
  // =======================
  const login = async (token: string, name: string, email: string, picture?: string) => {
    try {
      console.log("🔑 Starting login...");
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      setUserName(name);
      setUserEmail(email);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Token saved to localStorage and axios");

      // Проверяем наличие пароля
      const passRes = await axios.get(`${API_URL}/Account/HasPassword`);
      const hasPassword = passRes.data.hasPassword;
      setPasswordSetState(hasPassword);
      localStorage.setItem("passwordSet", String(hasPassword));

      // Картинка
      if (picture) {
        setUserPicture(picture);
        localStorage.setItem("userPicture", picture);
      }

      // Проверяем верификацию email
      const verifyRes = await axios.get(`${API_URL}/Account/VerificationStatus`);
      const verified = verifyRes.data.isEmailVerified;
      setIsEmailVerified(verified);
      localStorage.setItem("isEmailVerified", String(verified));

      console.log("Email verified:", verified);

      // Если не подтверждён — перенаправляем на страницу подтверждения
      if (!verified) {
        console.log("Redirecting to /verify-email");
        navigate("/verify-email");
      }

      // JWT
      const decoded = jwtDecode<{ exp?: number }>(token);
      if (!decoded.exp) {
        logout();
        return;
      }

      const expirationTime = decoded.exp * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());

      const timeUntilExpiration = expirationTime - Date.now();
      if (timeUntilExpiration > 0) {
        setTimeout(logout, timeUntilExpiration);
      } else {
        logout();
      }

      window.dispatchEvent(
        new CustomEvent("userLogin", { detail: { userName: name, userEmail: email, userPicture: picture } })
      );

    } catch (err) {
      console.error("Login failed:", err);
      logout();
    }
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
  // Проверка токена при старте
  // =======================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expTime = localStorage.getItem("tokenExpiration");

    if (!token || !expTime) return;

    const remaining = Number(expTime) - Date.now();

    if (remaining <= 0) {
      logout();
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setTimeout(logout, remaining);
    }
  }, []);

  // =======================
  // Слушатели событий (для синхронизации вкладок)
  // =======================
  useEffect(() => {
    const handleLogin = (e: CustomEvent<{ userName: string; userEmail: string; userPicture?: string }>) => {
      setUserName(e.detail.userName);
      setUserEmail(e.detail.userEmail);
      if (e.detail.userPicture) setUserPicture(e.detail.userPicture);
    };

    const handleLogout = () => {
      setUserName(null);
      setUserEmail(null);
      setUserPicture(null);
      setIsEmailVerified(false);
      setPasswordSetState(false);
    };

    const handlePictureUpdate = (e: CustomEvent<{ userPicture: string }>) => {
      setUserPicture(e.detail.userPicture);
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
