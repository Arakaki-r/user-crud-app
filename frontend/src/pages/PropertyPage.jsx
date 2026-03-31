import { useEffect, useState } from "react";
import {
  getProperties,
  deleteProperty,
  createProperty,
  updateProperty
} from "../api/api";

const PropertyPage = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showForm, setShowForm] = useState(false);

  // ★ 編集用ID
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

  // ===== 入力変更 =====
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ===== 作成 or 更新 =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        rent: Number(form.rent),
        ownerId: Number(form.ownerId)
      };

      if (editingId) {
        // ★ 更新
        const updated = await updateProperty(editingId, payload);

        setProperties((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );

      } else {
        // ★ 作成
        const created = await createProperty(payload);

        setProperties((prev) => [created, ...prev]);
      }

      // リセット
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

  // ===== 編集開始 =====
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

  // ===== 削除 =====
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

  if (loading) return <p style={{ color: "#ffffff" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>データ取得に失敗しました</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "16px", color: "#ffffff" }}>
        物件一覧
      </h2>

      {/* ★ 作成ボタン */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
        }}
        style={{
          marginBottom: "16px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        ＋ 物件追加
      </button>

      {/* ★ フォーム（作成・更新共通） */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#ffffff",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          <input name="name" placeholder="物件名" value={form.name} onChange={handleChange} required />
          <br />

          <input name="address" placeholder="住所" value={form.address} onChange={handleChange} required />
          <br />

          <input name="rent" placeholder="家賃" value={form.rent} onChange={handleChange} required />
          <br />

          <input name="ownerId" placeholder="オーナーID" value={form.ownerId} onChange={handleChange} required />
          <br />

          <button type="submit" style={{ marginTop: "10px" }}>
            {editingId ? "更新" : "作成"}
          </button>
        </form>
      )}

      {/* 一覧 */}
      {Array.isArray(properties) && properties.length > 0 ? (
        properties.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
              backgroundColor: "#ffffff",
              color: "#000000",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{p.name}</h3>
            <p>📍 {p.address}</p>
            <p>💰 {p.rent}円</p>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(p)}
                style={{ marginRight: "6px" }}
              >
                編集
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                削除
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#ffffff" }}>データがありません</p>
      )}
    </div>
  );
};

export default PropertyPage;