import Kbd from "@/components/Kbd";
import MyToolTip from "@/components/Tooltip";
import { ChevronLeft, Eye, EyeOff, Info } from "lucide-react";
import type React from "react";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { useAuth } from "@/hooks/useAuth";
import PasswordRequirements from "@/components/PasswordRequirement";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";

interface Token {
    name?: string,
    email?: string
}

const SignUpPage: React.FC = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { getPasswordError } = usePasswordValidation();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isUsernameLocked, setIsUsernameLocked] = useState(false);
    const [isCheckingGoogleAccount, setIsCheckingGoogleAccount] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const checkGoogleAccountExists = async (email: string) => {
        try {
            setIsCheckingGoogleAccount(true);
            const res = await axios.get(`http://localhost:5101/api/Account/CheckEmail?email=${email}`);
            
            if (res.data === false) {
                // Email уже существует
                setIsUsernameLocked(true);
            }
        } catch (err) {
            console.error("Error checking Google account:", err);
        } finally {
            setIsCheckingGoogleAccount(false);
        }
    };

    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.get(`http://localhost:5101/api/Account/CheckEmail?email=${email}`);

            if (res.data == true) {
                setStep(2);
            } else {
                setEmailError(t("email_already_exists"));
            }

        } catch (err) {
            console.error(err);
            alert("server error")
        }
    }

    const handlePasswordSubmit = (e: FormEvent) => {
        e.preventDefault();

        const passError = getPasswordError(password, confirmPassword);

        if (passError) {
            setPasswordError(t(passError));
            return;
        }

        setStep(3);
    }

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5101/api/Account/Register", {
                Email: email,
                UserName: userName,
                Password: password,
                ConfirmPassword: confirmPassword,
            });

            const loginRes = await axios.post("http://localhost:5101/api/Auth/Login", {
                Identifier: userName,
                Password: password,
            });

            const avatarUrlFromLogin = loginRes.data.data.avatarUrl;

            console.log("Avatar: ",loginRes.data.data.avatarUrl)

            const token = loginRes.data.data.accessToken;
            if (token) {
                const decodedToken = jwtDecode<Token>(token);
                const nameFromToken = decodedToken.name;
                const emailFromToken = decodedToken.email;

                if (!nameFromToken || !emailFromToken) {
                    return;
                }

                login(token, nameFromToken, emailFromToken, avatarUrlFromLogin);

                try {
                    await axios.post(
                        "http://localhost:5101/api/Account/Confirm",
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    navigate("/verify-email", { state: { email, userName, password } });
                } catch (err: any) {
                    console.error("Send verification email error:", err.response?.data || err.message);
                    setEmailError(t("verification_email_failed"));
                }

            } else {
                alert("Login failed: No access token received");
            }
        } catch (err) {
            console.error("Registration or login error:", err);
            alert("Registration or login failed");
        }
    };

    const handleUserNameSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.get(`http://localhost:5101/api/Account/CheckUser?username=${userName}`);

            if (res.data == true) {
                handleRegister(e);
            } else {
                setUserNameError(t("username_already_exists"));
            }
        } catch (err) {
            console.error(err);
            alert("server error");
        }
    };

    const handleGoogleRegister = async (e: FormEvent) => {
        e.preventDefault();
        
        // Если аккаунт уже заблокирован, не отправляем запрос
        if (isUsernameLocked) {
            return;
        }

        try {
            const payload = {
                UserInfo: {
                    Id: location.state.id,
                    Email: location.state.email,
                    VerifiedEmail: true,
                    Name: location.state.name,
                    Picture: location.state.picture
                },
                ChosenUserName: userName
            };

            const response = await axios.post("http://localhost:5101/api/Account/google/register", payload, { headers: { "Content-Type": "application/json" } });

            if (response.data.success) {
                const { accessToken, userName, email, picture } = response.data.data;

                console.log("ASAS", response.data.data)
                login(accessToken, userName, email, picture);
                navigate("/");
            }
        } catch (err: any) {
            console.error("Google registration error:", err);
            setIsUsernameLocked(true);
            setUserNameError(t("account_already_registered"));
        }
    };

    const registerWithGoogle = async () => {
        window.location.href = "http://localhost:5101/api/Auth/google/login";
    }

    useEffect(() => {
        if (location.state?.fromGoogle) {
            setStep(3);
            if (location.state.email) {
                setEmail(location.state.email);
                // Проверяем Google аккаунт сразу при получении email
                checkGoogleAccountExists(location.state.email);
            }
            if (location.state.suggestedUsername) {
                setUserName(location.state.suggestedUsername);
            }

            if (location.state.alreadyRegistered) {
                setUserName(location.state.suggestedUsername ?? "")
                setIsUsernameLocked(true);
            }
        }
    }, [location.state]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setEmailError("");
            setPasswordError("");
            setUserNameError("")
        }, 4000)

        return () => clearTimeout(timer);
    }, [emailError, passwordError, userNameError])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                history.back()
            }
        }

        document.addEventListener("keydown", handleKey);

        return () => document.removeEventListener("keydown", handleKey);
    }, [])

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-[#171719] select-none">

                <div className={`${(step == 1 || step == 3) && "pt-30 sm:pt-10"} p-5 sm:p-10 min-h-screen min-w-screen sm:min-h-0 sm:min-w-0 w-full max-w-md bg-[#222224] flex flex-col items-center rounded-lg`}>

                    {step == 1 && (
                        <>
                            <MyToolTip side="right" hint={
                                <>
                                    {t("back")} <Kbd shortCut='Esc' />
                                </>
                            }>

                                <button className="cursor-pointer absolute top-5 left-5 text-white bg-[#171719] sm:bg-[#222224] rounded-full p-3 transition-all hover:scale-[1.1] active:scale-[0.95]" onClick={() => history.back()}>
                                    <ChevronLeft />
                                </button>
                            </MyToolTip>

                            <h1 className="text-3xl font-bold mb-8 text-white">{t("sign_up")}</h1>

                            <form className="w-full" onSubmit={handleEmailSubmit}>
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-medium mb-2">{t("email")}</label>
                                    <input onChange={(e) => { setEmail(e.target.value); setEmailError("") }} placeholder="name@domain.com" type="email" required className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white truncate" />
                                </div>

                                <div className={`transition-all mb-4 text-red-400 text-sm flex items-center gap-2 ${emailError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Info />
                                    <span>{emailError}</span>
                                </div>

                                <button disabled={!email.trim()} type="submit" className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${email.trim() ? 'cursor-pointer bg-white text-black hover:bg-black hover:text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
                                    {t("continue")}
                                </button>
                            </form>

                            <div className="relative flex items-center w-full my-6">
                                <div className="flex-1 border-t border-gray-400"></div>
                                <span className="px-4 text-sm text-gray-400 select-none">{t("or")}</span>
                                <div className="flex-1 border-t border-gray-400"></div>
                            </div>

                            <div className="flex flex-col justify-center gap-3 text-white font-semibold w-full mb-6">
                                <button onClick={registerWithGoogle} className="cursor-pointer w-full px-6 py-3 rounded-full text-base flex items-center border border-gray-600 hover:border-gray-500 transition-all">
                                    <FcGoogle className="w-6 h-6 " />
                                    <span className="flex-1 text-center text-sm sm:text-base">
                                        {t("sign_up_with")} Google
                                    </span>
                                </button>
                            </div>

                            <div className="text-white">
                                {t("already_have_an_account")}?
                                <Link className="ml-1 text-blue-400 underline" to="/sign_in" replace>{t("sign_in")}</Link>
                            </div>
                        </>
                    )}

                    {step == 2 && (
                        <>
                            <div className="flex flex-col items-start gap-4 mb-8 w-full">
                                <div className="flex gap-2 items-center">
                                    <button
                                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-[1.1] active:scale-[0.95]"
                                        onClick={() => setStep(1)}
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>

                                    <div className="flex">
                                        <h1 className="text-2xl font-bold text-white leading-tight">
                                            {t("create_a_password")}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 mt-4 w-full">
                                    <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
                                    <div className="flex-1 h-1 bg-white rounded-full"></div>
                                    <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm">
                                        {t("choose_strong_pass")}
                                    </p>
                                </div>
                            </div>

                            <form className="w-full" onSubmit={handlePasswordSubmit}>
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-medium mb-2">{t("password")}</label>
                                    <div className="relative">
                                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} required placeholder="********" className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white" />
                                        <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
                                        </button>
                                    </div>

                                    <label className="block text-white text-sm font-medium mt-2 mb-2">{t("confirm_password")}</label>
                                    <div className="relative">
                                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={showConfirmPassword ? "text" : "password"} required placeholder="********" className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white" />
                                        <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            { showConfirmPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" /> }
                                        </button>
                                    </div>
                                </div>

                                <PasswordRequirements password={password} className="mt-5 mb-5" />

                                <div className={`transition-all mb-4 text-red-400 text-sm flex items-center gap-2 ${passwordError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Info />
                                    <span>{passwordError}</span>
                                </div>

                                <button type="submit" disabled={!password.trim()} className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${(password.trim() && confirmPassword.trim()) ? 'cursor-pointer bg-white text-black hover:bg-black hover:text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
                                    {t("continue")}
                                </button>
                            </form>
                        </>
                    )}

                    {step == 3 && (
                        <>
                            <div className="flex flex-col items-start gap-4 mb-8 w-full">
                                <div className="flex gap-2 items-center">
                                    <button
                                        disabled={location.state?.fromGoogle ?? false}
                                        className={`p-2 rounded-full transition-all duration-200 hover:scale-[1.1] active:scale-[0.95] ${location.state?.fromGoogle ? "cursor-not-allowed text-gray-400 " : "text-white/70 hover:text-white hover:bg-white/10"}`}
                                        onClick={() => setStep(2)}
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>

                                    <div className="flex">
                                        <h1 className="text-xl font-bold text-white leading-tight">
                                            {t("what_should_we_call_you")}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 mt-4 w-full">
                                    <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
                                    <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
                                    <div className="flex-1 h-1 bg-white rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm">{t("choose_username_that_represents_you")}</p>
                                </div>
                            </div>

                            {/* Показываем сообщение о проверке */}
                            {isCheckingGoogleAccount && (
                                <div className="w-full mb-4 p-4 bg-blue-500/20 text-blue-400 flex items-center gap-2 rounded-lg">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                    <span>{t("checking_account_status") || "Проверяем статус аккаунта..."}</span>
                                </div>
                            )}

                            <form className="w-full" onSubmit={location.state?.fromGoogle ? handleGoogleRegister : handleUserNameSubmit}>
                                <div className="mb-4">
                                    {isUsernameLocked && (
                                        <div className="p-4 bg-red-500/20 text-red-400 flex items-center gap-2 rounded-lg mb-4">
                                            <Info className="w-5 h-5" />
                                            <span>{t("account_already_registered")}</span>
                                            <Link to="/sign_in" className="underline text-blue-400 ml-2">
                                                {t("sign_in")}
                                            </Link>
                                        </div>
                                    )}

                                    <label className="block text-white text-sm font-medium mb-2">{t("username")}</label>
                                    <input 
                                        disabled={isUsernameLocked || isCheckingGoogleAccount} 
                                        onChange={(e) => { setUserName(e.target.value); setUserNameError(""); }} 
                                        value={userName} 
                                        type="text" 
                                        required 
                                        placeholder={t("enter_username")} 
                                        className={`w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white ${(isUsernameLocked || isCheckingGoogleAccount) && "bg-[#323235] cursor-not-allowed"}`} 
                                    />
                                </div>

                                <div className={`transition-all mb-4 text-red-400 text-sm flex items-center gap-2 ${userNameError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Info />
                                    <span>{userNameError}</span>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={!userName.trim() || isUsernameLocked || isCheckingGoogleAccount} 
                                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${(!userName.trim() || isUsernameLocked || isCheckingGoogleAccount) ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "cursor-pointer bg-white text-black hover:bg-black hover:text-white"}`}
                                >
                                    {isCheckingGoogleAccount ? t("checking") || "Проверяем..." : t("sign_up")}
                                </button>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default SignUpPage;