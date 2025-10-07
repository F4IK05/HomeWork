import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
// import HomePage from "@/pages/HomePage";
// import SignInPage from "@/pages/SignInPage";
// import SignUpPage from "@/pages/SignUpPage";
// import AccountPage from "@/pages/AccountPage";
// import { useAuth } from "@/hooks/useAuth";
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import GoogleAuthCallback from "@/pages/auth/GoogleAuthCallback";

// 🔒 Защищённый маршрут
// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { userName } = useAuth();
//   return userName ? <>{children}</> : <Navigate to="/sign_in" replace />;
// };

// Основной роутинг
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Главная страница */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* Аккаунт (только авторизованные) */}
      {/* <Route
        path="/account"
        element={
          <PrivateRoute>
            <MainLayout>
              <AccountPage />
            </MainLayout>
          </PrivateRoute>
        }
      /> */}

      {/* Аутентификация */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Неизвестный маршрут → на главную */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/auth/google" element={<GoogleAuthCallback />} />
    </Routes>
  );
};

export default AppRoutes;
