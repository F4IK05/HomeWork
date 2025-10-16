import React, { useEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";
import axios from "axios";
// import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { usePasswordValidation } from "@/hooks/usePasswordValidator";

interface LinkPasswordModalProps {
  setIsLinkModalOpen: (value: boolean) => void;
}

const LinkPasswordModal: React.FC<LinkPasswordModalProps> = ({
  setIsLinkModalOpen,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const { setPasswordSet } = useAuth();
  const { getPasswordError, getPasswordStrength } = usePasswordValidation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [strength, setStrength] = useState<"weak" | "medium" | "strong">("weak");

  useEffect(() => {
    const error = getPasswordError(password, confirmPassword);
    setPasswordError(error);
    setStrength(getPasswordStrength(password));
  }, [password, confirmPassword, getPasswordError, getPasswordStrength]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsLinkModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsLinkModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = getPasswordError(password, confirmPassword);
    if (error) {
      setPasswordError(error);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5017/api/Account/LinkPassword",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        // toast.success(t("password_linked_successfully"), {
        //   className: "bg-green-600 text-white font-semibold",
        // });
        setIsLinkModalOpen(false);
        setPasswordSet(true);
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || t("error_linking_password");
      setPasswordError(msg);
    }
  };

  const strengthColor =
    strength === "weak"
      ? "bg-red-500"
      : strength === "medium"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 animate-[fadeIn_0.25s_ease-out]">
      <div
        ref={modalRef}
        className="relative w-full sm:max-w-md h-full sm:h-auto bg-[#212124] p-6 border border-gray-700 rounded-none sm:rounded-2xl shadow-xl animate-[scaleIn_0.25s_ease-out]"
      >
        <button
          onClick={() => setIsLinkModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold text-white mb-2 mt-8">
          {t("set_password")}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {t("link_password_instruction")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t("new_password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="mt-2 flex items-center gap-2">
              <div className={`w-16 h-2 rounded-full ${strengthColor}`} />
              <p className="text-xs text-gray-400 capitalize">{t(strength)}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t("confirm_password")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {passwordError && (
            <div className="flex items-center gap-2 text-red-400 text-sm mt-3">
              <Info className="w-4 h-4" />
              <span>{t(passwordError)}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!!passwordError || !password || !confirmPassword}
            className={`w-full py-3 rounded-lg font-semibold mt-4 transition-all ${
              !passwordError && password && confirmPassword
                ? "bg-white text-black hover:bg-black hover:text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("continue")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LinkPasswordModal;
