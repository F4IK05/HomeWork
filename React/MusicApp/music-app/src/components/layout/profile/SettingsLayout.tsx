import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, ShieldCheck, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const GLASS = "bg-[#2a2a2e]/60 backdrop-blur-sm border border-white/10";
const ACTIVE_GLOW =
    "ring-1 ring-[#3b82f6]/50 shadow-[0_0_0_4px_rgba(59,130,246,0.12)] bg-white/10 text-white";

/* ─────────────────────────────────────────────────────────────
   Компонент лейаута настроек
   ───────────────────────────────────────────────────────────── */
const SettingsLayout: React.FC = () => {
    // #region Состояние и хуки
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
    const { logout } = useAuth();

    const { t } = useTranslation();
    // #endregion

    // #region Вспомогательные функции
    const isActive = (path: string) => location.pathname === path;

    // Текущий подзаголовок (для мобильного header)
    const title = useMemo(() => {
        if (location.pathname.startsWith("/profile/security")) return "Security";
        return "Profile";
    }, [location.pathname]);

    const goHome = () => navigate("/");

    const onClickMenuItem = (path: string, isDanger = false) => {
        if (isDanger) {
            setConfirmLogoutOpen(true);
            return;
        }
        // Мягко закрываем мобильное меню с небольшой задержкой
        if (mobileOpen) {
            setTimeout(() => setMobileOpen(false), 140);
        }
        navigate(path);
    };

    const doLogout = () => {
        logout();
    };
    // #endregion

    // #region Рендер
    return (
        <div className="w-full min-h-[100dvh] bg-[#1b1b1f] text-white">
            {/* ─────────────────────────────────────────────────────────
          Мобильный верхний бар: Back в хедере + бургер
         ───────────────────────────────────────────────────────── */}
            <header className="sm:hidden sticky top-0 z-30">
                <div className="px-4 py-3 flex items-center justify-between bg-[#1b1b1f]/95 backdrop-blur">
                    <button
                        onClick={goHome}
                        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10 transition"
                        aria-label="Back to Home"
                        title="Back to Home"
                    >
                        {/* Акцентная синяя стрелка на мобилке */}
                        <ArrowLeft className="w-[18px] h-[18px] text-[#3b82f6]" />
                        <span className="text-sm">Home</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold tracking-tight">Settings — {title}</div>
                        <button
                            className={`${GLASS} p-2 rounded-full hover:bg-white/10 transition`}
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-[18px] h-[18px]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ─────────────────────────────────────────────────────────
          Контейнер страницы
         ───────────────────────────────────────────────────────── */}
            <div className="max-h-dvh mx-auto max-w-7xl px-4 sm:py-8 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                    {/* ─────────────────────────────────────────────────────
              Sidebar (Desktop) — fixed/sticky стиль на всю высоту
             ───────────────────────────────────────────────────── */}
                    <aside className="hidden  sm:block sm:col-span-3 lg:col-span-3 min-w-[250px]">
                        {/* sticky обеспечивает фиксированность в рамках вьюпорта, без поломки контейнера */}
                        <div className={`sticky top-6 h-[calc(100vh-3rem)] rounded-2xl p-4 ${GLASS} overflow-hidden`}>
                            {/* Заголовок */}
                            <div className="px-2 pb-3">
                                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">Settings</div>
                            </div>


                            {/* Back под заголовком (всегда доступен, не активный) */}
                            <nav className="flex flex-col gap-1 px-0">
                                <button
                                    onClick={goHome}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition
                    bg-white/5 hover:bg-white/10 border border-white/10 text-white mb-2`}
                                    aria-label="Back"
                                >
                                    <span className="grid place-items-center h-7 w-7 rounded-lg bg-white/5">
                                        <ArrowLeft className="w-[18px] h-[18px] text-[#3b82f6]" />
                                    </span>
                                    <span className="text-sm font-medium">Back</span>
                                </button>

                                <div className="h-px bg-white/10 mb-3" />

                                {/* Навигационные пункты */}
                                <button
                                    onClick={() => onClickMenuItem("/profile")}
                                    className={`group w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition
                    ${isActive("/profile") ? ACTIVE_GLOW : "bg-white/5 hover:bg-white/10 border border-white/10"}
                    text-white`}
                                    aria-current={isActive("/profile") ? "page" : undefined}
                                >
                                    <span
                                        className={`grid place-items-center h-7 w-7 rounded-lg ${isActive("/profile") ? "bg-[#3b82f6]/20" : "bg-white/5 group-hover:bg-white/10"
                                            }`}
                                    >
                                        <User className="w-[18px] h-[18px]" />
                                    </span>
                                    <span className="text-sm font-medium">Profile</span>
                                </button>

                                <button
                                    onClick={() => onClickMenuItem("/profile/security")}
                                    className={`group w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition
                    ${isActive("/profile/security") ? ACTIVE_GLOW : "bg-white/5 hover:bg-white/10 border border-white/10"}
                    text-white`}
                                    aria-current={isActive("/profile/security") ? "page" : undefined}
                                >
                                    <span
                                        className={`grid place-items-center h-7 w-7 rounded-lg ${isActive("/profile/security") ? "bg-[#3b82f6]/20" : "bg-white/5 group-hover:bg-white/10"
                                            }`}
                                    >
                                        <ShieldCheck className="w-[18px] h-[18px]" />
                                    </span>
                                    <span className="text-sm font-medium">Security</span>
                                </button>
                            </nav>

                            {/* Разделитель и Logout внизу — безопасно вынесен */}
                            <div className="mt-auto pt-4">
                                <div className="h-px bg-white/10 mb-3" />
                                <button
                                    onClick={() => onClickMenuItem("", true)}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition
                    bg-white/5 hover:bg-white/10 border border-white/10 text-red-400 hover:text-red-300`}
                                >
                                    <span className="grid place-items-center h-7 w-7 rounded-lg bg-white/5">
                                        <LogOut className="w-[18px] h-[18px]" />
                                    </span>
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* ─────────────────────────────────────────────────────
              Контент справа (вложенные страницы через <Outlet />)
             ───────────────────────────────────────────────────── */}
                    <section className="sm:col-span-9 lg:col-span-9">
                        <Outlet />
                    </section>
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────
          Мобильное полноэкранное меню (burger)
         ───────────────────────────────────────────────────────── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40">
                    {/* Фон-затемнение */}
                    <div
                        className="absolute inset-0 bg-black/70 opacity-100 transition-opacity"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Панель меню */}
                    <div className={`absolute inset-0 p-4 pt-5 ${GLASS} mobile-menu-animate`}>
                        {/* Хедер мобильного меню */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-sm uppercase tracking-wider text-white/70">Settings</div>
                            <button
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="w-[18px] h-[18px]" />
                            </button>
                        </div>

                        {/* Back (mobile) */}
                        

                        {/* Навигация (mobile) */}
                        <nav className="flex flex-col gap-2">
                            <button
                                onClick={() => onClickMenuItem("/profile")}
                                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${isActive("/profile") ? ACTIVE_GLOW : "bg-white/5 hover:bg-white/10 border border-white/10"}
                  text-white`}
                                aria-current={isActive("/profile") ? "page" : undefined}
                            >
                                <span
                                    className={`grid place-items-center h-8 w-8 rounded-lg ${isActive("/profile") ? "bg-[#3b82f6]/20" : "bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    <User className="w-[18px] h-[18px]" />
                                </span>
                                <span className="text-sm font-medium">Profile</span>
                            </button>

                            <button
                                onClick={() => onClickMenuItem("/profile/security")}
                                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${isActive("/profile/security") ? ACTIVE_GLOW : "bg-white/5 hover:bg-white/10 border border-white/10"}
                  text-white`}
                                aria-current={isActive("/profile/security") ? "page" : undefined}
                            >
                                <span
                                    className={`grid place-items-center h-8 w-8 rounded-lg ${isActive("/profile/security") ? "bg-[#3b82f6]/20" : "bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    <ShieldCheck className="w-[18px] h-[18px]" />
                                </span>
                                <span className="text-sm font-medium">Security</span>
                            </button>

                            {/* Разделитель и Logout внизу */}
                            <div className="h-px bg-white/10 my-2" />

                            <button
                                onClick={() => onClickMenuItem("", true)}
                                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition
                  bg-white/5 hover:bg-white/10 border border-white/10 text-red-400 hover:text-red-300`}
                            >
                                <span className="grid place-items-center h-8 w-8 rounded-lg bg-white/5">
                                    <LogOut className="w-[18px] h-[18px]" />
                                </span>
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}

            {/* ─────────────────────────────────────────────────────────
          Модалка подтверждения Logout
         ───────────────────────────────────────────────────────── */}
            {confirmLogoutOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmLogoutOpen(false)} />
                    <div className={`relative w-full max-w-md mx-4 rounded-2xl ${GLASS} p-6`}>
                        <h3 className="text-lg font-semibold mb-2">Log out</h3>
                        <p className="text-sm text-white/70">
                            {t("you_sure_logout")}
                        </p>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                                onClick={() => setConfirmLogoutOpen(false)}
                            >
                                {t("cancel")}
                            </button>
                            <button
                                className="px-4 py-2 rounded-xl bg-red-500/90 hover:bg-red-500 transition"
                                onClick={doLogout}
                            >
                                {t("logout")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    // #endregion
};

export default SettingsLayout;