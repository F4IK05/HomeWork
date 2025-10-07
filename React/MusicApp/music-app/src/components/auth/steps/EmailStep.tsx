import { useState, type FormEvent } from "react";
import { Info, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthService } from "@/services/AuthService";
import { Link } from "react-router-dom";
import GoogleButton from "../GoogleButton";

interface Props {
  email: string;
  setEmail: (val: string) => void;
  onNext: () => void;
}

const EmailStep: React.FC<Props> = ({ email, setEmail, onNext }) => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const available = await AuthService.checkEmail(email);
      if (available) {
        onNext();
      } else {
        setError(t("email_already_exists"));
      }
    } catch {
      setError(t("server_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 🔙 Back button */}
      <button
        onClick={() => history.back()}
        className="cursor-pointer absolute top-5 left-5 text-white bg-[#222224] rounded-full p-3 transition-all hover:scale-[1.1]"
      >
        <ChevronLeft />
      </button>

      {/* 🧾 Title */}
      <h1 className="text-3xl font-bold mb-8 text-white">{t("sign_up")}</h1>

      {/* 📧 Email form */}
      <form onSubmit={handleSubmit} className="w-full mb-6">
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            {t("email")}
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            value={email}
            type="email"
            required
            placeholder="name@domain.com"
            className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white truncate"
          />
        </div>

        {/* ⚠️ Error */}
        <div
          className={`transition-all mb-4 text-red-400 text-sm flex items-center gap-2 ${
            error ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>{error}</span>
        </div>

        {/* ✅ Continue button */}
        <button
          disabled={!email.trim() || loading}
          type="submit"
          className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
            !email.trim() || loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-black hover:text-white cursor-pointer"
          }`}
        >
          {loading ? t("loading") : t("continue")}
        </button>
      </form>

      {/* ⚫ Divider */}
      <div className="relative flex items-center w-full my-6">
        <div className="flex-1 border-t border-gray-400"></div>
        <span className="px-4 text-sm text-gray-400 select-none">
          {t("or")}
        </span>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      
      <div className="flex flex-col justify-center gap-3 text-white font-semibold w-full mb-6">
        <GoogleButton />
      </div>

      {/* 🔗 Footer link */}
      <div className="text-gray-400 text-sm">
        {t("already_have_an_account")}?
        <Link className="ml-1 text-blue-400 underline" to="/sign-in" replace>
          {t("sign_in")}
        </Link>
      </div>
    </div>
  );
};

export default EmailStep;
