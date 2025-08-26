import React from "react";
import { Camera, Mail, Phone, MapPin } from "lucide-react";
import { useAccount } from "@/hooks/useAccount";
import { useAuth } from "@/hooks/useAuth";

const MainContent: React.FC = () => {
    const { activeSection } = useAccount();
    const { userName, userEmail, userPicture } = useAuth();

    const getUserInitial = () => {
        return userName ? userName.charAt(0).toUpperCase() : "";
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="space-y-8">
                        {/* Header with Avatar */}
                        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">
                            <div className="w-24 h-24 relative">
                                {userPicture ? (
                                    <img className="w-24 h-24 rounded-full object-cover" src={userPicture} alt={userName ?? undefined}/>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-white">
                                        {getUserInitial()}
                                    </div>
                                )}
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

                        {/* Bio Field
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">О себе</label>
              <textarea
                // value={profileData.bio}
                // onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div> */}

                        {/* Save Button */}
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                            Сохранить изменения
                        </button>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white">Безопасность</h2>

                        <div className="space-y-6">
                            {/* Password Change */}
                            <div className="p-6 bg-[#212124] rounded-lg">
                                <h3 className="text-lg font-semibold text-white mb-4">Смена пароля</h3>
                                <div className="space-y-4">
                                    <input
                                        type="password"
                                        placeholder="Текущий пароль"
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Новый пароль"
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Подтвердите новый пароль"
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Обновить пароль
                                    </button>
                                </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className="p-6 bg-[#212124] rounded-lg">
                                <h3 className="text-lg font-semibold text-white mb-4">Двухфакторная аутентификация</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-300">Дополнительная защита вашего аккаунта</p>
                                        <p className="text-sm text-gray-400">Статус: Отключена</p>
                                    </div>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        Включить
                                    </button>
                                </div>
                            </div>


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

    return (
        <div className="p-8 flex-1 h-full overflow-y-auto">
            {/* Main Content Area */}
            <div className="bg-[#1e1e22] rounded-lg p-8 w-full max-w-3xl mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default MainContent;