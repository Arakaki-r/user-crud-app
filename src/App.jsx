import { useState, useEffect } from "react";
import api from "./api/api";

import Login from "./Login";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";

function App() {

  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    }

  }, []);

  const fetchUsers = async () => {

    const res = await api.get("/users");

    setUsers(res.data.data.content);

  };

  const createUser = async (name, email) => {

    await api.post("/users", {
      name,
      email
    });

    fetchUsers();

  };

  const updateUser = async (id, name, email) => {

    await api.put(`/users/${id}`, {
      name,
      email
    });

    setEditUser(null);

    fetchUsers();

  };

  const deleteUser = async (id) => {

    await api.delete(`/users/${id}`);

    fetchUsers();

  };

  const startEdit = (user) => {
    setEditUser(user);
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

  const searchUser = async () => {

    const res = await api.get("/users/search", {
      params: { name: searchName }
    });

    setUsers(res.data.data);

  };

  useEffect(() => {

    if (isLogin) {
      fetchUsers();
    }

  }, [isLogin]);

  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }

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