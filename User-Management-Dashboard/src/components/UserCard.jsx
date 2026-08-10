function UserCard({ user, onDelete }) {
  return (
    <div className="user-card">
      <div>
        <h3>{user.name}</h3>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Experience:</strong> {user.experience} years
        </p>
      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(user.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default UserCard;