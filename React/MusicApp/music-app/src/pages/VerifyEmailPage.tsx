import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, Loader2 } from "lucide-react";

const VerifyEmailPage = () => {
    const { userEmail, setEmailVerified, logout } = useAuth();
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState<string | null>(
        "Verification email has been sent. Please check your inbox."
    );
    const [checking, setChecking] = useState(false);

    // Проверяем каждые 5 секунд, подтвержден ли email
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const interval = setInterval(async () => {
            try {
                const verified = await AuthService.checkVerification(token);
                if (verified) {
                    setEmailVerified(true);
                    clearInterval(interval);
                    navigate("/", { replace: true }); // ← нельзя вернуться назад
                }
            } catch (err) {
                console.warn("Verification check failed:", err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [navigate, setEmailVerified]);

    // Ручная отправка письма (Resend)
    const handleResend = async () => {
        console.log("handleResend clicked!");
        setIsSending(true);
        setMessage(null);
        const token = localStorage.getItem("token");

        try {
            if (!token) throw new Error("No token found");
            await AuthService.sendVerificationEmail(token);
            setMessage("Verification email sent! Please check your inbox.");
        } catch (err) {
            console.error("Resend error:", err);
            setMessage("Failed to send email. Try again later.");
        } finally {
            setIsSending(false);
        }
    };

    // Ручная проверка по кнопке Continue
    const handleContinue = async () => {
        setChecking(true);
        setMessage(null);
        const token = localStorage.getItem("token");

        try {
            if (!token) throw new Error("No token found");
            const verified = await AuthService.checkVerification(token);

            if (verified) {
                setEmailVerified(true);
                navigate("/", { replace: true });
            } else {
                setMessage("Your email is still not verified.");
            }
        } catch {
            setMessage("Something went wrong while checking verification.");
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#171719] text-white p-6 text-center">
            <div className="max-w-md w-full bg-[#222224] p-10 rounded-xl shadow-xl">
                <Mail className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
                <p className="text-gray-400 mb-6">
                    We’ve sent a confirmation email to <br />
                    <span className="text-blue-400 font-medium">{userEmail}</span>
                </p>

                {message && (
                    <div className="text-sm text-blue-300 bg-blue-500/20 py-2 px-3 rounded-lg mb-4 transition-all">
                        {message}
                    </div>
                )}

                <button
                    onClick={handleContinue}
                    disabled={checking}
                    className="w-full mb-3 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                    {checking ? (
                        <span className="flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" /> Checking...
                        </span>
                    ) : (
                        "Continue"
                    )}
                </button>

                <button
                    onClick={handleResend}
                    disabled={isSending}
                    className="w-full py-3 rounded-lg bg-[#171719] border border-gray-600 text-white hover:bg-[#2c2c30] transition"
                >
                    {isSending ? (
                        <span className="flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" /> Sending...
                        </span>
                    ) : (
                        "Resend verification email"
                    )}
                </button>

                <button
                    onClick={logout}
                    className="w-full mt-5 text-sm text-gray-400 underline hover:text-gray-300"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
