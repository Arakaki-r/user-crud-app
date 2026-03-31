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

        // データ形式の違いに対応
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>データ取得に失敗しました</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "16px" }}>物件一覧</h2>

      {Array.isArray(properties) && properties.length > 0 ? (
        properties.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
              backgroundColor: "#f9f9f9"
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
        <p>データがありません</p>
      )}
    </div>
  );
};

export default PropertyPage;