import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PropertyPage from "./pages/PropertyPage";

// 🔐 認証ガード
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ ログインは常に表示（ここ重要） */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ 認証必要ページ */}
        <Route
          path="/properties"
          element={
            <PrivateRoute>
              <PropertyPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />

        {/* ✅ 初期アクセスは必ずログインへ */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ✅ 404もログインへ */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;