function UserList({ users, deleteUser, startEdit }) {

  return (

    <div>

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

                <button onClick={() => startEdit(user)}>
                  Edit
                </button>

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

export default UserList;