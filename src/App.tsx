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
import ArticleDetailPage from "./pages/authenticated/ArticleDetailPage";

export default function App() {
  const { theme } = useThemeStore();
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    // Apply current theme
    const root = document.documentElement;
    root.classList.add(theme);

    // Authentication check (only runs on mount)
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
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
        path="/article/:documentId"
        element={user ? <ArticleDetailPage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/category"
        element={user ? <CategoryPage /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}
