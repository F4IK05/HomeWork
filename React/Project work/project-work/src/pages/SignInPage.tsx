import type React from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { ChevronLeft, Info } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyToolTip from "@/components/Tooltip";
import Kbd from "@/components/Kbd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/hooks/useAuth";

interface Token {
    name?: string;
    email?: string;
    picture?: string;
}

const SignInPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [identifier, setIdentifier] = useState(""); // username/email
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleGoogleLogin = () => {
        // Перенаправляем на эндпоинт Google аутентификации
        window.location.href = "http://localhost:5101/api/Auth/google/login";
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const loginRes = await axios.post("http://localhost:5101/api/Auth/Login", {
                Identifier: identifier,
                Password: password,
            });

            const token = loginRes.data.data.accessToken;

            if (token) {
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                const decodedToken = jwtDecode<Token>(token);
                const nameFromToken = decodedToken.name;
                const emailFromToken = decodedToken.email;
                const pictureFromToken = decodedToken.picture;

                if (!nameFromToken || !emailFromToken) {
                    return;
                }

                login(token, nameFromToken, emailFromToken, pictureFromToken);

                try {
                    const verificationRes = await axios.get(
                        "http://localhost:5101/api/Account/VerificationStatus",
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (verificationRes.data.isEmailVerified) {
                        navigate("/", { replace: true });
                    } else {
                        await axios.post(
                            "http://localhost:5101/api/Account/Confirm",
                            {},
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        navigate("/verify-email", {
                            state: { email: emailFromToken, userName: nameFromToken },
                        });
                    }
                } catch (err: any) {
                    console.error("Verification or email sending error:", err.response?.data || err.message);
                    setError(t("verification_check_failed"));
                }
            }
        } catch {
            setError(t("invalid_credentials"));
        }
    };

    const onBlock = () => {
        return !identifier.trim() || !password.trim();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
        }, 4000);

        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                history.back();
            }
        };

        document.addEventListener("keydown", handleKey);

        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-[#171719] select-none">
                <MyToolTip side="right" hint={
                    <>
                        {t("back")} <Kbd shortCut='Esc' />
                    </>
                }>
                    <button className="cursor-pointer absolute top-5 left-5 text-white bg-[#171719] sm:bg-[#222224] rounded-full p-3 transition-all hover:scale-[1.1] active:scale-[0.95]" onClick={() => history.back()}>
                        <ChevronLeft />
                    </button>
                </MyToolTip>

                <div className="pt-30 min-h-screen min-w-screen sm:min-h-0 sm:min-w-0 w-full max-w-md bg-[#222224] flex flex-col items-center rounded-lg p-10 sm:p-12">
                    <h1 className="text-3xl font-bold mb-8 text-white">{t("sign_in")}</h1>

                    <div className="flex flex-col justify-center gap-3 text-white font-semibold w-full">
                        <button 
                            onClick={handleGoogleLogin}
                            className="cursor-pointer w-full px-6 py-3 rounded-full text-base relative flex items-center border border-gray-600 hover:border-gray-500 transition-all"
                        >
                            <FcGoogle className="w-6 h-6" />
                            <span className="flex-1 text-center text-sm sm:text-base">
                                {t("login_with")} Google
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
                            <input 
                                onChange={(e) => setIdentifier(e.target.value)} 
                                value={identifier} 
                                placeholder={t("email_or_username")} 
                                type="text" 
                                className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white truncate" 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-medium mb-2">{t("password")}</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                placeholder="********" 
                                type="password" 
                                className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white" 
                            />
                        </div>

                        <div className={`transition-all mb-4 text-red-400 text-sm flex items-center gap-2 ${error ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
                            <Info />
                            <span>{error}</span>
                        </div>

                        <button 
                            disabled={onBlock()} 
                            type="submit" 
                            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${!onBlock() ? 'cursor-pointer bg-white text-black hover:bg-black hover:text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                        >
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
    );
};

export default SignInPage;