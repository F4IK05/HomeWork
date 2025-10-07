import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Info, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { usePasswordValidation } from "@/hooks/usePasswordValidator";

interface Props {
  password: string;
  confirmPassword: string;
  setPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PasswordStep: React.FC<Props> = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onNext,
  onBack,
}) => {
  const { t } = useTranslation();
  const { getPasswordError } = usePasswordValidation();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const passError = getPasswordError(password, confirmPassword);
    if (passError) {
      setError(t(passError));
      return;
    }
    onNext();
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-400 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-white">
          {t("create_a_password")}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm text-white">{t("password")}</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-white">{t("confirm_password")}</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
            </button>
          </div>
        </div>

        <PasswordRequirements password={password} className="mt-5 mb-5" />

        {error && (
          <div className="flex items-center text-red-400 text-sm mt-2 gap-1">
            <Info className="w-4 h-4" /> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!password.trim() || !confirmPassword.trim()}
          className={`mt-4 w-full px-6 py-3 rounded-lg font-semibold transition-all ${
            password && confirmPassword
              ? "bg-white text-black hover:bg-black hover:text-white cursor-pointer"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {t("continue")}
        </button>
      </form>
    </>
  );
};

export default PasswordStep;
