import React from "react";

export default function UserForm({
  name,
  email,
  isEditing,
  onNameChange,
  onEmailChange,
  onSubmit,
}) {
  return (
    <div className="add-user">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />

      <button onClick={onSubmit}>{isEditing ? "Save" : "Add User"}</button>
    </div>
  );
}

