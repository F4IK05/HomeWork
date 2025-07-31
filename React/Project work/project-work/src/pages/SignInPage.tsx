import type React from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";


const SignInPage: React.FC = () => {
    const { t } = useTranslation();

    const [emailValue, setEmailValue] = useState("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }

    const onBlock = () => {
        if (emailValue.length == 0) {
            return true;
        }

        return false;
    }


    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-[#171719]">
                <button className="cursor-pointer absolute top-5 left-5 text-white bg-[#171719] sm:bg-[#222224] rounded-full p-3 transition-all hover:scale-[1.1] active:scale-[0.95]" onClick={() => history.back()}>
                    <ChevronLeft />
                </button>

                <div className="pt-30 min-h-screen min-w-screen sm:min-h-0 sm:min-w-0 w-full max-w-md bg-[#222224] flex flex-col items-center rounded-lg p-10 sm:p-12">
                    <h1 className="text-3xl font-bold mb-8 text-white">{t("sign_in")}</h1>

                    <div className="flex flex-col justify-center gap-3 text-white font-semibold w-full">
                        <button className="cursor-pointer w-full px-6 py-3 rounded-full text-base relative flex items-center border border-gray-600 hover:border-gray-500 transition-all">
                            <FcGoogle className="w-6 h-6" />
                            <span className="flex-1 text-center text-sm sm:text-base">
                                {t("login_with")} Google
                            </span>
                        </button>

                        <button className="cursor-pointer w-full px-6 py-3 rounded-full text-base flex items-center border border-gray-600 hover:border-gray-500 transition-all">
                            <FaApple className="w-6 h-6" />
                            <span className="flex-1 text-center text-sm sm:text-base">
                                {t("login_with")} Apple
                            </span>
                        </button>
                    </div>

                    <div className="relative flex items-center w-full my-6 ">
                        <div className="flex-1 border-t border-gray-400"></div>
                        <span className="px-4 text-sm text-gray-400 select-none">{t("or")}</span>
                        <div className="flex-1 border-t border-gray-400"></div>
                    </div>

                    <form className="w-full mb-6" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-medium mb-2">{t("email_or_username")}</label>
                            <input onChange={(e) => setEmailValue(e.target.value)} placeholder={t("email_or_username")} type="email" className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white truncate" />
                        </div>

                        <button disabled={onBlock()} type="submit" className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${emailValue.trim() ? 'cursor-pointer bg-white text-black hover:bg-black hover:text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
                            {t("continue")}
                        </button>
                    </form>

                    <div className="text-white">
                        {t("no_account")}?
                        <Link className="ml-1 text-blue-400 underline" to="/sign_up" replace>{t("sign_up")}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;