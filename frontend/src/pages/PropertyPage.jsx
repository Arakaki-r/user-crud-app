import { useEffect, useState } from "react";
import { getProperties } from "../api/api";

const PropertyPage = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        console.log("取得データ:", data);

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

  if (loading) return <p style={{ color: "#ffffff" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>データ取得に失敗しました</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#1a1a1a", // 背景固定（ダーク）
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
              backgroundColor: "#ffffff", // カード白固定
              color: "#000000", // 文字黒固定
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{p.name}</h3>
            <p style={{ margin: "4px 0" }}>📍 {p.address}</p>
            <p style={{ margin: "4px 0", fontWeight: "bold" }}>
              💰 {p.rent}円
            </p>
          </div>
        ))
      ) : (
        <p style={{ color: "#ffffff" }}>データがありません</p>
      )}
    </div>
  );
};

export default PropertyPage;