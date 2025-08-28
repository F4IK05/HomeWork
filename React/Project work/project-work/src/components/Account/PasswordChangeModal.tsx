import { useTranslation } from "react-i18next";
import PasswordRequirements from "../PasswordRequirement";
import { Info, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "@/hooks/useAccount";
import axios from "axios";
import toast from "react-hot-toast";

const PasswordChangeModal: React.FC = () => {
    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const modalRef = useRef<HTMLDivElement>(null);

    const { isPasswordModalOpen, setIsPasswordModalOpen } = useAccount();

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setPasswordError(t("pass_do_not_match"));
            return;
        }

        const token = localStorage.getItem("token");
        console.log("Token exists:", !!token);

        const requestData = {
            currentPassword: currentPassword,
            newPassword: password
        };

        try {
            const res = await axios.post("http://localhost:5101/api/Account/ChangePassword", requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            if (res.status === 200) {
                toast.success(t("password_changed_successfully"), { className: "bg-green-600 text-white font-semibold" });
                setIsPasswordModalOpen(false);
                setCurrentPassword("");
                setPassword("");
                setConfirmPassword("");
            }
        }
        catch (err: any) {

            if (err.response && err.response.data) {
                let errorMessage;

                if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                    if (errorMessage == "Current password is incorrect") {
                        errorMessage = t("current_pass_is_incorrect")
                    } else if (errorMessage == "New password cannot be the same as the old password") {
                        errorMessage = t("new_pass_cannot_be_same_as_old")
                    }
                }

                setPasswordError(errorMessage);
            } else {
                setPasswordError("Произошла ошибка при изменении пароля");
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isPasswordModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsPasswordModalOpen(false);
            }

        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isPasswordModalOpen, setIsPasswordModalOpen]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
            <div
                ref={modalRef}
                className="relative w-full h-full rounded-none sm:rounded-2xl sm:h-auto sm:max-w-md bg-[#212124] p-4 sm:p-6 border border-gray-700 flex flex-col">
                {/* Кнопка закрытия */}
                <button
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-100"
                >
                    <X className="w-7 h-7 sm:w-5 sm:h-5" />
                </button>

                <div className="relative -top-8 sm:top-0">

                    <div className="flex flex-col items-start gap-4 mb-8 w-full mt-10 sm:mt-0 ">
                        <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">{t("change_password")}</h1>
                        <p className="text-white/60 text-sm">{t("choose_strong_pass")}</p>
                    </div>

                    <form className="w-full flex-1 overflow-y-auto" onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            {/* Текущий пароль */}
                            <label className="block text-white text-sm font-medium mb-2">{t("current_password")}</label>
                            <input
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                value={currentPassword}
                                type="password"
                                required
                                placeholder="********"
                                className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
                            />

                            {/* Новый пароль */}
                            <label className="block text-white text-sm font-medium mt-4 mb-2">{t("new_password")}</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                required
                                placeholder="********"
                                className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
                            />

                            {/* Подтверждение */}
                            <label className="block text-white text-sm font-medium mt-4 mb-2">{t("confirm_password")}</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                type="password"
                                required
                                placeholder="********"
                                className="w-full px-4 py-3 rounded-lg bg-[#171719] border border-gray-700 text-white"
                            />
                        </div>

                        <PasswordRequirements password={password} className="mt-5 mb-5" />

                        {/* Ошибка */}
                        <div
                            className={`transition-all mb-4 text-red-400 text-sm flex items-center gap-2 ${passwordError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <Info />
                            <span>{passwordError}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={!currentPassword.trim() || !password.trim() || !confirmPassword.trim()}
                            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all mt-auto ${currentPassword.trim() && password.trim() && confirmPassword.trim()
                                ? "cursor-pointer bg-white text-black hover:bg-black hover:text-white"
                                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {t("continue")}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PasswordChangeModal;
