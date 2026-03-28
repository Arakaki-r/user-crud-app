import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import UserList from "../components/UserList";

function UserPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      console.log("APIレスポンス:", data); // ←配列が出る

      setUsers(data || []);
    } catch (err) {
      console.error("ユーザー取得エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}

export default UserPage;