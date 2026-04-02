import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/api";
import UserList from "../components/UserList";

const API_URL = "https://user-management-api-bhn3.onrender.com";

function UserPage() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("取得エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== CREATE =====
  const createUser = async () => {
    try {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name, email })
      });

      setName("");
      setEmail("");

      fetchUsers();
    } catch (err) {
      console.error("作成エラー:", err);
    }
  };

  // ===== DELETE =====
  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      fetchUsers();
    } catch (err) {
      console.error("削除エラー:", err);
    }
  };

  // ===== EDIT開始 =====
  const startEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  // ===== UPDATE =====
  const updateUser = async () => {
    try {
      await fetch(`${API_URL}/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name,
          email
        })
      });

      setEditingUser(null);
      setName("");
      setEmail("");

      fetchUsers();
    } catch (err) {
      console.error("更新エラー:", err);
    }
  };

  // ★ログアウト
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0c2345",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "20px",
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          color: "#fff"
        }}
      >
        <h2>User List</h2>

        {/* ★ナビ追加 */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate("/properties")}>
            物件管理へ
          </button>

          <button
            onClick={handleLogout}
            style={{ marginLeft: "10px", backgroundColor: "#ef4444", color: "#fff" }}
          >
            ログアウト
          </button>
        </div>

        {/* 入力フォーム */}
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="メール"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={editingUser ? updateUser : createUser}>
            {editingUser ? "更新" : "追加"}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserList
            users={users}
            deleteUser={deleteUser}
            startEdit={startEdit}
          />
        )}
      </div>
    </div>
  );
}

export default UserPage;