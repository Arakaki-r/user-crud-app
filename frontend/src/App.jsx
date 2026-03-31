import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PropertyPage from "./pages/PropertyPage";

// 認証ガード
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  return <Navigate to="/login" replace />;
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
            token ? <Navigate to="/users" replace /> : <LoginPage />
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

        {/* ★ 物件一覧（追加） */}
        <Route
          path="/properties"
          element={
            <PrivateRoute>
              <PropertyPage />
            </PrivateRoute>
          }
        />

        {/* ルート */}
        <Route path="/" element={<Navigate to="/users" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;