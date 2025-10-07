import { useEffect, useState, type FormEvent } from "react";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthService } from "@/services/AuthService";
import { useNavigate, type Location } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface LocationState {
  fromGoogle?: boolean;
  googleId?: string;
  email?: string;
  name?: string;
  picture?: string;
  suggestedUsername?: string;
}

interface Props {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  location: Location<LocationState>;
  setUsername: (val: string) => void;
  onBack: () => void;
}

const UsernameStep: React.FC<Props> = ({
  email,
  password,
  confirmPassword,
  username,
  location,
  setUsername,
  onBack,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fromGoogle = location.state?.fromGoogle;

  // Автоматическая подстановка предложенного ника при Google-регистрации
  useEffect(() => {
    if (fromGoogle && location.state?.suggestedUsername) {
      setUsername(location.state.suggestedUsername);
    }
  }, [fromGoogle, location.state, setUsername]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (fromGoogle) {
        // Регистрация через Google
        const payload = {
          UserInfo: {
            Id: location.state?.googleId,
            Email: location.state?.email,
            VerifiedEmail: true,
            Name: location.state?.name,
            Picture: location.state?.picture,
          },
          ChosenUserName: username,
        };

        const res = await AuthService.googleRegister(payload);
        if (res.data.success) {
          navigate("/");
        }
      } else {
        // Обычная регистрация
        const userExists = await AuthService.checkUsername(username);

        console.log("User exists:", userExists);

        if (!userExists) {
          await AuthService.register(email, username, password, confirmPassword);

          const res = await AuthService.loginAfterRegister(username, password);

          console.log("Login after register response:", res);

          await login(res.token, res.name, res.email, res.avatar);

          await AuthService.sendVerificationEmail(res.token);

          navigate("/verify-email", { state: { email, username }, replace: true });
        } else {
          setError(t("username_already_exists"));
        }
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(t("registration_failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Назад */}
      <button
        type="button"
        onClick={onBack}
        className="text-gray-400 hover:text-white mb-4"
        disabled={fromGoogle} // нельзя назад, если Google
      >
        ← {t("back")}
      </button>

      {/* Поле ввода */}
      <label className="text-sm text-white">{t("username")}</label>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
        disabled={isLoading}
        className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
        placeholder={t("enter_username")}
      />

      {/* Ошибки */}
      {error && (
        <div className="flex items-center text-red-400 text-sm mt-2 gap-1">
          <Info className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Кнопка */}
      <button
        type="submit"
        disabled={!username.trim() || isLoading}
        className={`mt-4 w-full px-6 py-3 rounded-lg font-semibold transition-all ${
          username.trim() && !isLoading
            ? "bg-white text-black hover:bg-black hover:text-white cursor-pointer"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? t("loading") : t("sign_up")}
      </button>
    </form>
  );
};

export default UsernameStep;
