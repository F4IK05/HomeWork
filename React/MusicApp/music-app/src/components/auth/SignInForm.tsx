import React, { useState, useEffect, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/AuthService";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const SignInForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { token, name, email, avatar } = await AuthService.login(identifier, password);
      login(token, name, email, avatar);

      const verified = await AuthService.checkVerification(token);
      if (!verified) await AuthService.sendVerificationEmail(token);

      navigate(verified ? "/" : "/verify-email");
    } catch (err) {
      console.error(err);
      setError(t("invalid_credentials"));
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">{t("email_or_username")}</span>
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full mt-2 px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
          placeholder={t("email_or_username")}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">{t("password")}</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
          placeholder="********"
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <Info className="w-4 h-4" /> <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!identifier || !password}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          !identifier || !password
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-white text-black hover:bg-black hover:text-white"
        }`}
      >
        {t("continue")}
      </button>

      <p className="text-center text-sm text-gray-400 mt-4">
        {t("no_account")}{" "}
        <Link to="/sign-up" className="text-blue-400 underline" replace>
          {t("sign_up")}
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
