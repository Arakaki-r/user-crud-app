import { useState } from "react";
import { login } from "../api/api";

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {
      await login(username, password);
      window.location.href = "/users";
    } catch (err) {
      alert("ログイン失敗");
    }
  };

  return (
    <div>

      <h2>Login</h2>

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

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default LoginPage;