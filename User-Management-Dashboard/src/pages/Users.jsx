import { useEffect, useState } from "react";

import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";

const initialUsers = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali@example.com",
    role: "Frontend Developer",
    experience: 2,
  },
  {
    id: 2,
    name: "Ahmed Raza",
    email: "ahmed@example.com",
    role: "Backend Developer",
    experience: 3,
  },
  {
    id: 3,
    name: "Sara Malik",
    email: "sara@example.com",
    role: "UI/UX Designer",
    experience: 4,
  },
];

function Users() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");

    return savedUsers
      ? JSON.parse(savedUsers)
      : initialUsers;
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function handleDelete(id) {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  }

  const filteredUsers = users.filter((user) => {
    const searchTerm = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>
            Total users: <strong>{users.length}</strong>
          </p>
        </div>

        <SearchBar
          search={search}
          onSearch={setSearch}
        />
      </div>

      <UserList
        users={filteredUsers}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default Users;