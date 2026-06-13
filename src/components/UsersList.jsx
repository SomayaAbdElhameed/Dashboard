import React from "react";

export default function UsersList({ users, onEdit, onDelete }) {
  return (
    <section className="users-list">
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id} className="user-item">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          <span>{user.role}</span>

          <div className="user-actions">
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </section>
  );
}

