import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8080/auth/login",
        {
          username: username,
          password: password
        }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);

      onLogin();

    } catch (error) {

      alert("ログイン失敗");

    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Login</h2>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

    </div>

  );

}

export default Login;