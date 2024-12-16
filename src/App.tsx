import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { useThemeStore } from "./stores/useThemeStore";
import { Loader } from "lucide-react";

import DashboardPage from "./pages/authenticated/DashboardPage";
import GuestPage from "./pages/guest/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import ArticlePage from "./pages/authenticated/ArticlePage";
import CategoryPage from "./pages/authenticated/CategoryPage";

export default function App() {
  const { theme } = useThemeStore();
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  // Apply current theme whenever page change or refresh.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(theme);
  }, [theme]);

  // Check the user is authenticated or not on every page mounted.
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GuestPage />} />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to={"/dashboard"} />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/article"
        element={user ? <ArticlePage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/category"
        element={user ? <CategoryPage /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}
