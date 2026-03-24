import { useState, useEffect } from "react";

function UserForm({ createUser, updateUser, editUser, cancelEdit }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
    }
  }, [editUser]);

  const handleSubmit = () => {

    if (editUser) {
      updateUser(editUser.id, name, email);
    } else {
      createUser(name, email);
    }

    setName("");
    setEmail("");
  };

  return (

    <div>

      <h2>{editUser ? "Edit User" : "Create User"}</h2>

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

      <button onClick={handleSubmit}>
        {editUser ? "Update" : "Create"}
      </button>

      {editUser && (
        <button onClick={cancelEdit}>Cancel</button>
      )}

    </div>
  );
}

export default UserForm;