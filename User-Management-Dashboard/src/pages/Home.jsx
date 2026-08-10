import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="dashboard">
      <div className="hero">
        <h1>User Management Dashboard</h1>

        <p>
          Manage users, add new users, search users, and remove users.
        </p>

        <Link to="/users" className="primary-button">
          Manage Users
        </Link>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Users</h3>
          <p>View and manage all users.</p>
        </div>

        <div className="dashboard-card">
          <h3>Add User</h3>
          <p>Create a new user.</p>
        </div>

        <div className="dashboard-card">
          <h3>Search</h3>
          <p>Quickly find users.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;