import React, { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/global/MainLayout";
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
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsLayout from "@/components/layout/profile/SettingsLayout";
import SecurityPage from "@/pages/profile/SecurityPage";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

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

      <Route path="/auth/google" element={<GoogleAuthCallback />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <SettingsLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfilePage />} />
        <Route path="security" element={<SecurityPage />} />
        {/* позже: <Route path="account" element={<AccountPage />} /> */}
      </Route>


      {/* Неизвестный маршрут → на главную */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
  );
};

export default AppRoutes;
