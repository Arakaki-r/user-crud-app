import { useEffect, useState } from "react";
import { getProperties, deleteProperty } from "../api/api";

const PropertyPage = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("① API開始");

        const data = await getProperties();

        console.log("② API成功:", data);

        setProperties(data?.data || data || []);

      } catch (err) {
        console.error("③ APIエラー:", err);
        setError(true);
      } finally {
        console.log("④ 処理終了");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 削除処理
  const handleDelete = async (id) => {
    if (!window.confirm("削除してもよろしいですか？")) return;

    try {
      console.log("削除開始:", id);

      await deleteProperty(id);

      console.log("削除成功");

      // 画面から削除
      setProperties((prev) => prev.filter((p) => p.id !== id));

    } catch (err) {
      console.error("削除エラー:", err);
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
            <p style={{ margin: "4px 0" }}>📍 {p.address}</p>
            <p style={{ margin: "4px 0", fontWeight: "bold" }}>
              💰 {p.rent}円
            </p>

            <div style={{ marginTop: "10px" }}>
              <button style={{ marginRight: "5px" }}>詳細</button>

              <button style={{ marginRight: "5px" }}>編集</button>

              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
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