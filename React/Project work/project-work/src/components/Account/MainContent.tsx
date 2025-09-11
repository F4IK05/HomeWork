import React, { use, useEffect } from "react";
import { Camera, ChevronLeft, ChevronRight, Key, Lock, X } from "lucide-react";
import { useAccount } from "@/hooks/useAccount";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import PasswordChangeModal from "./PasswordChangeModal";
import LinkPasswordModal from "./LinkPasswordModal";
import { useNavigate } from "react-router-dom";

const MainContent: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { activeSection, setActiveSection ,isPasswordModalOpen, isLinkModalOpen, setIsPasswordModalOpen, setIsLinkModalOpen } = useAccount();
    const { userName, userEmail, userPicture, passwordSet } = useAuth();

    console.log("set? ", passwordSet)

    useEffect(() => {
        if (location.hash == "#security") {
            setActiveSection("security");
        }
    }, [activeSection, setActiveSection]);

    const renderContent = () => {

        switch (activeSection) {
            case 'profile':
                return (
                    <div className="space-y-5">

                        {/* Header with Avatar */}
                        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">
                            <div className="w-24 h-24 relative">
                                <img className="w-24 h-24 rounded-full object-cover" src={userPicture} alt={userName} />
                                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                                    <Camera className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-white">{userName}</h2>
                                <p className="text-gray-400">{userEmail}</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Имя</label>
                                <input
                                    type="text"
                                    //   value={profileData.name}
                                    //   onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <input
                                    type="email"
                                    //   value={profileData.email}
                                    //   onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                            Сохранить изменения
                        </button>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white">{t("security")}</h2>


                        <div className="space-y-4">
                            {passwordSet ? (
                                <button onClick={() => setIsPasswordModalOpen(true)} className="group w-full bg-[#212124] hover:bg-[#28282c] text-white font-semibold rounded-2xl p-4 transition-all flex items-center justify-between border border-gray-700 ">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-500/20 group-hover:bg-orange-500/30 rounded-lg transition-colors">
                                            <Key className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <span>{t("change_password")}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                </button>
                            ) : (
                                <button onClick={() => setIsLinkModalOpen(true)} className="group w-full bg-[#212124] hover:bg-[#28282c] text-white font-semibold rounded-2xl p-4 transition-all flex items-center justify-between border border-gray-700 ">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg transition-colors">
                                            <Lock className="w-5 h-5 text-green-400" />
                                        </div>
                                        <span>{t("link_password")}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                </button>
                            )}

                            {isPasswordModalOpen && <PasswordChangeModal />}
                            {isLinkModalOpen && <LinkPasswordModal />}
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white">Уведомления</h2>

                        <div className="space-y-6">
                            {[
                                { title: 'Email уведомления', desc: 'Получать уведомления на email' },
                                { title: 'Push уведомления', desc: 'Браузерные уведомления' },
                                { title: 'SMS уведомления', desc: 'Получать SMS на телефон' },
                                { title: 'Уведомления о безопасности', desc: 'Важные события безопасности' },
                                { title: 'Маркетинговые сообщения', desc: 'Новости и предложения' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-[#212124] rounded-lg">
                                    <div>
                                        <h3 className="text-white font-medium">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white">Общие настройки</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Язык и регион</h3>
                                <div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Язык интерфейса</label>
                                        <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                            <option>Русский</option>
                                            <option>English</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div className="p-6 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg">
                                <h3 className="text-lg font-semibold text-red-400 mb-4">Опасная зона</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white">Деактивировать аккаунт</p>
                                            <p className="text-sm text-gray-400">Временно скрыть ваш профиль</p>
                                        </div>
                                        <button className="px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                                            Деактивировать
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white">Удалить аккаунт</p>
                                            <p className="text-sm text-gray-400">Полностью удалить все данные</p>
                                        </div>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

        }
    };

    const titles: Record<string, string> = {
        profile: t("profile") || "Моя учётная запись",
        security: t("security") || "Безопасность",
        notifications: t("notifications") || "Уведомления",
        settings: t("settings") || "Настройки",
    };

    return (
        <div className="flex-1 h-full overflow-y-auto">
            <div className="bg-[#1e1e22] rounded-lg w-full max-w-3xl mx-auto flex flex-col">

                {/* 🔹 Header как у Discord */}
                <div className="sm:hidden flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        {/* Стрелка назад */}
                        <button
                            onClick={() => setActiveSection("profile")} // или navigate(-1)
                            className="p-2 rounded-full hover:bg-[#2a2a2e] transition"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <h2 className="text-lg font-bold text-white">
                            {t("settings")}
                        </h2>
                    </div>

                    {/* Крестик (закрыть) */}
                    <button
                        onClick={() => navigate("/")} // или setActiveSection("profile")
                        className="p-2 rounded-full hover:bg-[#2a2a2e] transition"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* 🔹 Контент */}
                <div className="p-8">{renderContent()}</div>
            </div>
        </div>
    );
};

export default MainContent;