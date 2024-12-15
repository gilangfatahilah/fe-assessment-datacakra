import { Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/authenticated/DashboardPage";
import GuestPage from "./pages/GuestPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import ArticlePage from "./pages/authenticated/ArticlePage";
import CategoryPage from "./pages/authenticated/CategoryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/article" element={<ArticlePage />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
  );
}
