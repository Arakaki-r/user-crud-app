import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PropertyPage from "./pages/PropertyPage";

// 認証ガード
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* ログイン */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/properties" replace /> : <LoginPage />
          }
        />

        {/* 物件一覧（メイン） */}
        <Route
          path="/properties"
          element={
            <PrivateRoute>
              <PropertyPage />
            </PrivateRoute>
          }
        />

        {/* ユーザー一覧 */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />

        {/* ルート → 物件一覧へ */}
        <Route path="/" element={<Navigate to="/properties" replace />} />

        {/* 404 → 物件一覧へ */}
        <Route path="*" element={<Navigate to="/properties" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;