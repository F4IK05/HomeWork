import axios from "axios";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  userName: string | null;
  userEmail: string | null;
  userPicture: string | null;
  isEmailVerified: boolean;
  login: (token: string, name: string, email: string, picture?: string) => Promise<void>;
  logout: () => void;
  setEmailVerified: (verified: boolean) => void;
  updateUserPicture: (picture: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem("userEmail"));
  const [userPicture, setUserPicture] = useState<string | null>(localStorage.getItem("userPicture"));
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(() => {
    const stored = localStorage.getItem("isEmailVerified");
    return stored === "true";
  });

  const logout = () => {
    setUserName(null);
    setUserEmail(null);
    setUserPicture(null);
    setIsEmailVerified(false);
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("isEmailVerified");
    delete axios.defaults.headers.common["Authorization"];
    window.dispatchEvent(new CustomEvent("userLogout"));
    navigate("/");
  };

  const login = async (token: string, name: string, email: string, picture?: string) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);

      if (picture) {
        localStorage.setItem("userPicture", picture);
        setUserPicture(picture);
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Проверка статуса верификации через API
      const res = await axios.get("http://localhost:5101/api/Account/VerificationStatus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isVerified = res.data.isEmailVerified;
      setIsEmailVerified(isVerified);
      localStorage.setItem("isEmailVerified", String(isVerified));

      const decodedToken = jwtDecode<{ exp?: number }>(token);
      if (!decodedToken.exp) {
        logout();
        return;
      }

      const expirationTime = decodedToken.exp * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());

      const timeUntilExpiration = expirationTime - Date.now();
      if (timeUntilExpiration > 0) {
        setTimeout(() => {
          logout();
        }, timeUntilExpiration);
      } else {
        logout();
      }

      setUserName(name);
      setUserEmail(email);
      window.dispatchEvent(new CustomEvent("userLogin", { detail: { userName: name, userEmail: email, userPicture: picture } }));
    } catch {
      logout();
    }
  };

  const setEmailVerified = (verified: boolean) => {
    setIsEmailVerified(verified);
    localStorage.setItem("isEmailVerified", verified ? "true" : "false");
  };

  const updateUserPicture = (picture: string) => {
    setUserPicture(picture);
    localStorage.setItem("userPicture", picture);
    window.dispatchEvent(new CustomEvent("userPictureUpdate", {
      detail: { userPicture: picture }
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");
    if (token && expirationTime) {
      const timeUntilExpiration = Number(expirationTime) - Date.now();
      if (timeUntilExpiration <= 0) {
        logout();
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setTimeout(() => {
          logout();
        }, timeUntilExpiration);
      }
    }
  }, []);


  useEffect(() => {
    interface UserLoginEvent extends CustomEvent {
      detail: { userName: string; userEmail: string, userPicture?: string; };
    }

    interface UserPictureUpdateEvent extends CustomEvent {
      detail: { userPicture: string };
    }

    const handleUserLogin = (event: UserLoginEvent) => {
      setUserName(event.detail.userName);
      setUserEmail(event.detail.userEmail);
      if (event.detail.userPicture) {
        setUserPicture(event.detail.userPicture);
      }
    };

    const handleUserLogout = () => {
      setUserName(null);
      setUserEmail(null);
      setUserPicture(null);
      setIsEmailVerified(false);
    };

    const handleUserPictureUpdate = (event: UserPictureUpdateEvent) => {
      setUserPicture(event.detail.userPicture);
    };

    window.addEventListener("userLogin", handleUserLogin as EventListener);
    window.addEventListener("userLogout", handleUserLogout);
    window.addEventListener("userPictureUpdate", handleUserPictureUpdate as EventListener);

    return () => {
      window.removeEventListener("userLogin", handleUserLogin as EventListener);
      window.removeEventListener("userLogout", handleUserLogout);
      window.removeEventListener("userPictureUpdate", handleUserPictureUpdate as EventListener);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userName, userEmail, userPicture, isEmailVerified, login, logout, setEmailVerified, updateUserPicture }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;