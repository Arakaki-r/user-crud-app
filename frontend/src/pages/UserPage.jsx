import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import UserList from "../components/UserList";

function UserPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    getUsers()
      .then((res) => setUsers(res.data.data.content))
      .catch((err) => console.error(err));

  }, []);

  return (
    <div>

      <h2>User List</h2>

      <UserList users={users} />

    </div>
  );
}

export default UserPage;