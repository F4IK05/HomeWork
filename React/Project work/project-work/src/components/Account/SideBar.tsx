import { useAccount } from "@/hooks/useAccount";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, Shield, Bell, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SideBarProps {
  onItemClick?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onItemClick }) => {
    const { t } = useTranslation();
    const { userName, userEmail, userPicture } = useAuth();
    const { activeSection, setActiveSection } = useAccount();

    const sidebarItems = [
        { id: 'profile', icon: User, label: t("profile") },
        { id: 'security', icon: Shield, label: t("security") },
        { id: 'notifications', icon: Bell, label: t("notifications") },
        { id: 'settings', icon: Settings, label: t("settings") }
    ];

    return (
        <div className="min-h-screen md:p-8">
            <div className="w-fit">
                <div className="bg-[#1e1e22] rounded-lg p-6">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                            <img className="w-15 rounded-full object-cover" src={userPicture} alt={userName} />
                            
                            
                        </div>
                        <div>
                            <p className="text-white font-medium">{userName}</p>
                            <p className="text-xs text-gray-400">{userEmail}</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {setActiveSection(item.id); onItemClick?.();}}
                                    
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === item.id
                                        ? 'bg-gray-400 text-black shadow-lg'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition-all">
                            <LogOut className="w-5 h-5" />
                            {t("logout")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;