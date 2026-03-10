import { useState, useEffect } from "react";
import axios from "axios";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";

function App() {

  const API = "http://localhost:8080/users";

  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data.data.content);
  };

  const createUser = async (name, email) => {

    await axios.post(API, {
      name,
      email
    });

    fetchUsers();
  };

  const updateUser = async (id, name, email) => {

    await axios.put(`${API}/${id}`, {
      name,
      email
    });

    setEditUser(null);

    fetchUsers();
  };

  const deleteUser = async (id) => {

    await axios.delete(`${API}/${id}`);

    fetchUsers();
  };

  const startEdit = (user) => {
    setEditUser(user);
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

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

      <UserForm
        createUser={createUser}
        updateUser={updateUser}
        editUser={editUser}
        cancelEdit={cancelEdit}
      />

      <SearchBar
        searchName={searchName}
        setSearchName={setSearchName}
        searchUser={searchUser}
        reset={fetchUsers}
      />

      <UserList
        users={users}
        deleteUser={deleteUser}
        startEdit={startEdit}
      />

    </div>

  );
}

export default App;