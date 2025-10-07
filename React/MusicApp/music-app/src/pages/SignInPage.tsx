import React from "react";
import SignInForm from "@/components/auth/SignInForm";
import GoogleButton from "@/components/auth/GoogleButton";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
// import MyToolTip from "@/components/Tooltip";
// import Kbd from "@/components/Kbd";

const SignInPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#171719] select-none relative">
      {/* Назад */}
      {/* <MyToolTip
        side="right"
        hint={
          <>
            {t("back")} <Kbd shortCut="Esc" />
          </>
        }
      >
      </MyToolTip> */}
        <button
          onClick={() => history.back()}
          className="cursor-pointer absolute top-5 left-5 text-white bg-[#222224] rounded-full p-3 transition-all hover:scale-[1.1]"
        >
          <ChevronLeft />
        </button>

      <div className="w-full max-w-md bg-[#222224] rounded-lg p-10 sm:p-12 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">{t("sign_in")}</h1>

        <GoogleButton />
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-400" />
          <span className="px-4 text-sm text-gray-400">{t("or")}</span>
          <div className="flex-1 border-t border-gray-400" />
        </div>

        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
