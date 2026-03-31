import axios from "axios";

const api = axios.create({
  baseURL: "https://user-management-api-bhn3.onrender.com"
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
    console.error("API ERROR:", error?.response || error);

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
  return res.data?.data?.content || res.data?.data || [];
};

// 物件一覧（ここ修正）
export const getProperties = async () => {
  const res = await api.get("/properties");
  return res.data?.data || res.data || [];
};

// 作成
export const createProperty = async (data) => {
  const res = await api.post("/properties", data);
  return res.data.data;
};

// 更新
export const updateProperty = async (id, data) => {
  const res = await api.put(`/properties/${id}`, data);
  return res.data.data;
};

// 削除
export const deleteProperty = async (id) => {
  await api.delete(`/properties/${id}`);
};

export default api;