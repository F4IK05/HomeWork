import { useEffect, useState, type FormEvent } from "react";
import { Info, ArrowLeft } from "lucide-react"; // Заменили ChevronLeft на ArrowLeft
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
        // Предполагается, что в случае успеха googleRegister также выполняет вход
        if (res.data.success) { 
          navigate("/");
        }
      } else {
        // Обычная регистрация
        const userExists = await AuthService.checkUsername(username);

        if (!userExists) {
          await AuthService.register(email, username, password, confirmPassword);

          const res = await AuthService.loginAfterRegister(username, password);
          
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
  
  const isButtonDisabled = !username.trim() || isLoading;

  return (
    <div className="w-full flex flex-col items-center select-none relative">
      
      {!fromGoogle && (
        <button
          type="button"
          onClick={onBack}
          disabled={fromGoogle}
          className="cursor-pointer absolute top-0 left-0 w-10 h-10 flex items-center justify-center
                     rounded-full bg-white/5 border border-white/10
                     hover:bg-white/10 hover:border-white/20
                     text-gray-300 hover:text-white
                     transition shadow-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      <h1 className="text-3xl font-bold mb-8 text-white mt-10">
        {t("choose_username") || "Choose Username"}
      </h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            {t("username")}
          </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 placeholder:text-gray-700 text-white truncate"
            placeholder={t("enter_username") || "Enter your desired username"}
          />
        </div>

        {error && (
          <div className="flex items-center justify-center text-red-400 text-sm mb-4 gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span className="text-center">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`mt-4 w-full px-6 py-3 rounded-full font-semibold transition-all ${
            !isButtonDisabled
              ? "bg-green-500 text-black" // Активный стиль из SignUp
              : "bg-[#171719] text-gray-400 cursor-not-allowed" // Неактивный стиль из SignUp
          }`}
        >
          {isLoading ? t("loading") : t("sign_up")}
        </button>
      </form>
    </div>
  );
};

export default UsernameStep;