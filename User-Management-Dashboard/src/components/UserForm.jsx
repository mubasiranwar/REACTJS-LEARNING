import { useState } from "react";

function UserForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !role || !experience) {
      alert("Please fill in all fields.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      experience: Number(experience),
    };

    onAddUser(newUser);

    setName("");
    setEmail("");
    setRole("");
    setExperience("");
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>

      <div className="form-group">
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Role</label>

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Frontend Developer"
        />
      </div>

      <div className="form-group">
        <label>Experience</label>

        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Years"
          min="0"
        />
      </div>

      <button type="submit" className="primary-button">
        Add User
      </button>
    </form>
  );
}

export default UserForm;