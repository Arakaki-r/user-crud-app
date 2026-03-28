function UserList({ users, deleteUser, startEdit }) {

  return (
    <div>

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

          {users.length === 0 ? (
            <tr>
              <td colSpan="4">データがありません</td>
            </tr>
          ) : (
            users.map((user) => (

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

            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default UserList;