import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthService } from "@/services/AuthService";
import { useTranslation } from "react-i18next";

const GoogleButton: React.FC = () => {
  const { t } = useTranslation();

  return (
    <button
      onClick={AuthService.redirectToGoogle}
      className="w-full flex items-center justify-center gap-3 border border-gray-600 hover:border-gray-500 rounded-full py-3 px-6 text-sm font-medium transition-all"
    >
      <FcGoogle className="w-5 h-5" />
      {t("login_with")} Google
    </button>
  );
};

export default GoogleButton;
