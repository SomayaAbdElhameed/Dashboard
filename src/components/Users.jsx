import React, { useEffect, useMemo, useState } from "react";
import { deleteUser, getUsers } from "../api/usersApi";
import UserCrudForm from "./UserCrudForm";
import Cards from './Cards'
const usersPerPage = 5;

const Users = () => {
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode") || "list";
const id = params.get("id");

// Keep hooks unconditional (rules-of-hooks)
const [search, setSearch] = useState("");
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
// Don’t load the list when editing
if (mode === "edit") return;

let isMounted = true;

(async () => {
if (!isMounted) return;
try {
setLoading(true);
setError(null);
const data = await getUsers();
if (isMounted) setUsers(Array.isArray(data) ? data : []);
} catch (e) {
if (isMounted) setError(e);
} finally {
if (isMounted) setLoading(false);
}
})();

return () => {
isMounted = false;
};
}, [mode]);

const filteredUsers = useMemo(() => {
const q = search.trim().toLowerCase();
if (!q) return users;
return users.filter((user) => (user?.name || "").toLowerCase().includes(q));
}, [users, search]);

useEffect(() => {
if (mode === "edit") return;
setCurrentPage(1);
}, [search, mode]);

const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

const currentUsers = useMemo(() => {
return filteredUsers.slice(
(currentPage - 1) * usersPerPage,
currentPage * usersPerPage
);
}, [filteredUsers, currentPage]);

const handleDeleteUser = async (idToDelete) => {
try {
await deleteUser(idToDelete);
setUsers((prev) => prev.filter((user) => user.id !== idToDelete));
} catch (e) {
console.log(e);
}
};

if (mode === "edit") {
// render form in edit mode
return <UserCrudForm />;
}

return (
<>
<Cards/>
<main className="dashboard-content">
<div className="container-fluid px-3 px-lg-4 py-4">
<section className="panel mt-3">
<div className="panel-header">
<div>
<h2 className="h5 mb-1 section-title">
<i className="bi bi-table" aria-hidden="true"></i>
<span>User List</span>
</h2>
<p className="text-muted mb-0">Search, review, and manage team member accounts.</p>
</div>

<input
className="form-control search-input"
type="search"
placeholder="Search users"
data-table-search="usersTable"
aria-label="Search users"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>

<div className="d-flex flex-wrap gap-2"> </div>
</div>

<div className="table-responsive">
<table className="table align-middle mb-0" id="usersTable" data-searchable-table>
<thead>
<tr>
<th scope="col">User</th>
<th scope="col">Role</th>
<th scope="col">Team</th>
<th scope="col">Status</th>
<th scope="col">Joined</th>
<th scope="col" className="text-end">Action</th>
</tr>
</thead>

<tbody>
{loading ? (
<tr>
<td colSpan="6" className="text-muted">Loading users...</td>
</tr>
) : error ? (
<tr>
<td colSpan="6" className="text-danger">Failed to load users.</td>
</tr>
) : filteredUsers.length === 0 ? (
<tr>
<td colSpan="6" className="text-muted">No users found.</td>
</tr>
) : (
currentUsers.map((user) => (
<tr key={user.id}>
<td>
<div className="d-flex align-items-center gap-2">
<div>
<p className="fw-semibold mb-0">{user.name}</p>
<p className="text-muted small mb-0">{user.email}</p>
</div>
</div>
</td>
<td>{user.role}</td>
<td>{user.team}</td>
<td>
<span
className={`badge ${
user.status === "Active"
? "text-bg-success"
: user.status === "Pending"
? "text-bg-warning"
: user.status === "Suspended"
? "text-bg-secondary"
: "text-bg-secondary"
}`}
>
{user.status}
</span>
</td>
<td>{user.joined}</td>
<td className="text-end">
<div className="btn-group" role="group" aria-label="User actions">
<a
className="btn btn-light btn-sm"
href={`/Users?mode=edit&id=${user.id}`}
>
<i className="bi bi-pencil" aria-hidden="true" /> Edit
</a>
<button
type="button"
className="btn btn-danger btn-sm"
onClick={() => {
if (window.confirm("Delete this user?")) handleDeleteUser(user.id);
}}
>
<i className="bi bi-trash" aria-hidden="true" /> Delete
</button>
</div>
</td>
</tr>
))
)}
</tbody>
</table>
</div>

<div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
<p className="text-muted small mb-0">Showing 1 to 5 of {users.length} users</p>

<nav aria-label="Users pagination">
<ul className="pagination pagination-sm mb-0">
<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
<a
className="page-link"
href="#"
onClick={(e) => {
e.preventDefault();
setCurrentPage((p) => Math.max(1, p - 1));
}}
>
Previous
</a>
</li>

{Array.from({ length: totalPages }).slice(0, 2).map((_, idx) => {
const page = idx + 1;
return (
<li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
<a
className="page-link"
href="#"
onClick={(e) => {
e.preventDefault();
setCurrentPage(page);
}}
>
{page}
</a>
</li>
);
})}

<li className="page-item">
<a
className="page-link"
href="#"
onClick={(e) => {
e.preventDefault();
setCurrentPage((p) => Math.min(totalPages, p + 1));
}}
>
Next
</a>
</li>
</ul>
</nav>
</div>
</section>
</div>
</main>
</>
);
};

export default Users;

