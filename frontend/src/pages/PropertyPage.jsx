import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProperties,
  deleteProperty,
  createProperty,
  updateProperty
} from "../api/api";

const PropertyPage = () => {

  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    rent: "",
    status: "入居中",
    ownerId: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data?.data || data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        rent: Number(form.rent),
        ownerId: Number(form.ownerId)
      };

      if (editingId) {
        const updated = await updateProperty(editingId, payload);
        setProperties((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );
      } else {
        const created = await createProperty(payload);
        setProperties((prev) => [created, ...prev]);
      }

      setForm({
        name: "",
        address: "",
        rent: "",
        status: "入居中",
        ownerId: ""
      });

      setEditingId(null);
      setShowForm(false);

    } catch (err) {
      console.error(err);
      alert("処理に失敗しました");
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      address: p.address,
      rent: p.rent,
      status: p.status,
      ownerId: p.ownerId
    });

    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("削除してもよろしいですか？")) return;

    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました");
    }
  };

  // ★ログアウト追加
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>データ取得に失敗しました</p>;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0c2345",
        padding: "20px"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}
      >

        <p style={{ color: "#94a3b8", fontSize: "12px" }}>
          ※ オーナーIDはユーザー一覧のIDを入力してください（例: 1）
        </p>

        <h2 style={{ marginBottom: "20px" }}>物件一覧</h2>

        {/* ★ナビ追加（ここだけ） */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate("/users")}>
            ユーザー管理へ
          </button>

          <button
            onClick={handleLogout}
            style={{ marginLeft: "10px", backgroundColor: "#ef4444" }}
          >
            ログアウト
          </button>
        </div>

        {/* 作成ボタン */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#1677ff",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ＋ 物件追加
        </button>

        {/* フォーム */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#271b58",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input name="name" placeholder="物件名" value={form.name} onChange={handleChange} required />
              <input name="address" placeholder="住所" value={form.address} onChange={handleChange} required />
              <input name="rent" placeholder="家賃" value={form.rent} onChange={handleChange} required />
              <input name="ownerId" placeholder="オーナーID" value={form.ownerId} onChange={handleChange} required />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "12px",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#52c41a",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              {editingId ? "更新" : "作成"}
            </button>
          </form>
        )}

        {/* 一覧 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px"
          }}
        >
          {Array.isArray(properties) && properties.length > 0 ? (
            properties.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "16px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(168, 37, 37, 0.06)",
                  color: "#010711"
                }}
              >
                <h3>{p.name}</h3>
                <p>📍 {p.address}</p>
                <p>💰 {p.rent}円</p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{
                      marginRight: "6px",
                      padding: "6px 10px"
                    }}
                  >
                    編集
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      backgroundColor: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>データがありません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;