import UserCard from "./UserCard";

function UserList({ users, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <h3>No users found</h3>
        <p>Try adding a new user or changing your search.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default UserList;