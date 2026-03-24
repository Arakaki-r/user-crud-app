import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

// ===== request interceptor =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===== response interceptor =====
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ===== API =====

// ログイン
export const login = async (username, password) => {

  const res = await api.post("/auth/login", {
    username,
    password
  });

  const token = res.data.token;

  localStorage.setItem("token", token);

  return token;
};

// ユーザー一覧
export const getUsers = async () => {

  const res = await api.get("/users");

  return res.data.data.content;
};

export default api;