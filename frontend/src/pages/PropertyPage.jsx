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
        setProperties(data.data || data);
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
    <div>
      <h2>物件一覧</h2>

      {properties.length === 0 ? (
        <p>データがありません</p>
      ) : (
        properties.map((p) => (
          <div key={p.id}>
            <p>物件名: {p.name}</p>
            <p>住所: {p.address}</p>
            <p>家賃: {p.rent}円</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyPage;