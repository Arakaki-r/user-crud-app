import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);

      // ログイン成功後に遷移
      navigate("/users");

    } catch (err) {
      console.error(err);
      alert("ログイン失敗");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0c2345",
        display: "flex",              // ★中央寄せ
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          Login
        </h2>

        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{
            marginTop: "10px",
            backgroundColor: "#1677ff",
            color: "#fff"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;