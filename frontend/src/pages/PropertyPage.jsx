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

  // 入力変更
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 作成 or 更新
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

  // 編集開始
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

  // 削除
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>データ取得に失敗しました</p>;

  return (
    <div style={{ padding: "24px" }}>

      <h2 style={{ marginBottom: "16px" }}>物件一覧</h2>

      {/* 作成ボタン */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
        }}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#333",
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
            background: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            maxWidth: "400px"
          }}
        >
          <input name="name" placeholder="物件名" value={form.name} onChange={handleChange} required /><br />
          <input name="address" placeholder="住所" value={form.address} onChange={handleChange} required /><br />
          <input name="rent" placeholder="家賃" value={form.rent} onChange={handleChange} required /><br />
          <input name="ownerId" placeholder="オーナーID" value={form.ownerId} onChange={handleChange} required /><br />

          <button type="submit" style={{ marginTop: "10px" }}>
            {editingId ? "更新" : "作成"}
          </button>
        </form>
      )}

      {/* 🔥 グリッド表示 */}
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
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{p.name}</h3>
              <p>📍 {p.address}</p>
              <p style={{ fontWeight: "bold" }}>💰 {p.rent}円</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleEdit(p)}
                  style={{
                    marginRight: "6px",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer"
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
          <p>データがありません</p>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;