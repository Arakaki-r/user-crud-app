import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const API = "http://localhost:8080/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [searchName, setSearchName] = useState("");

  // 一覧取得
  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data.data.content);
  };

  // ユーザー作成
  const createUser = async () => {
    await axios.post(API, {
      name: name,
      email: email
    });

    setName("");
    setEmail("");
    fetchUsers();
  };

  // 削除
  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  // 検索
  const searchUser = async () => {
    const res = await axios.get(`${API}/search`, {
      params: { name: searchName }
    });

    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h2>Create User</h2>

      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={createUser}>Create</button>


      <h2>Search User</h2>

      <input
        placeholder="search name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <button onClick={searchUser}>Search</button>

      <button onClick={fetchUsers}>Reset</button>


      <h2>User List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;