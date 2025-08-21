import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const VerifyEmailPage = () => {
    const { t } = useTranslation(); 

    const location = useLocation();
    const navigate = useNavigate();

    const { setEmailVerified } = useAuth()

    const { email } = location.state || {};
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!email || !token) {
            console.error("Missing email or token:", { email, token });
            setError("Missing email or token. Please try signing up again.");
            return;
        }

        const interval = setInterval(async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5101/api/Account/VerificationStatus",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (res.data.isEmailVerified) {
                    setIsVerified(true);
                    setEmailVerified(true);
                    clearInterval(interval);

                    try {
                        navigate("/", { replace: true });
                    } catch (err) {
                        console.error("Navigation failed:", err);
                        setError(t("navigation_failed"));    
                    }
                }
            } catch (err) {
                console.error("Verification check failed:", err);
                setError("Failed to check verification status. Please try again later.");
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [email, navigate, setEmailVerified, t]);

    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-[#171719] text-white">
            <button
                    onClick={() => {navigate("/"); setEmailVerified(false)}}
                    className="absolute top-10 left-10 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                    {t("later")}
                </button>

            <h1 className="text-3xl mb-4">{t("verify_your_email")}</h1>
            <p className="mb-6">
                {email && (
                    `${t("we_sent_a_verification_link_to")} ${email}. ${t("please_check_your_inbox")}.`
                )}
            </p>

            {error && (
                <p className="mb-4 text-red-400">{error}</p>
            )}

            {isVerified ? (
                <p>{t("email_verified_redirecting")}</p>
            ) : (
                <p>{t("waiting_for_verification")}</p>
            )}
        </div>
    );
};

export default VerifyEmailPage;