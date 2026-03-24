import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

// 認証ガード
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ログイン */}
        <Route path="/login" element={<LoginPage />} />

        {/* 認証必須 */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />

        {/* 初期リダイレクト */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;