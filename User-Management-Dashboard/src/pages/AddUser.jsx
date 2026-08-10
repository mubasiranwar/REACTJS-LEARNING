import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

function AddUser() {
  const navigate = useNavigate();

  function handleAddUser(user) {
    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = [...existingUsers, user];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    navigate("/users");
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Add User</h1>
          <p>Create a new user account.</p>
        </div>
      </div>

      <UserForm onAddUser={handleAddUser} />
    </section>
  );
}

export default AddUser;