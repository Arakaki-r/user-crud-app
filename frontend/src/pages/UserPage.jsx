import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import UserTable from "../components/UserTable";

function UserPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>

      <h2>User List</h2>

      <button onClick={handleLogout}>
        Logout
      </button>

      <UserTable users={users} />

    </div>
  );
}

export default UserPage;