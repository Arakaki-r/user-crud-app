import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

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

        <Route
          path="/login"
          element={
            token ? <Navigate to="/users" replace /> : <LoginPage />
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

        <Route path="/" element={<Navigate to="/users" replace />} />

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;