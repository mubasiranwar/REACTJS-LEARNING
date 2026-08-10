import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2>User Manager</h2>

        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/add-user">Add User</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;