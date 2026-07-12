import React, { useEffect, useMemo, useState } from "react";
import { addUser, deleteUser, getUsers, updateUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const parseQuery = () => {
if (typeof window === "undefined") return {};
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode") || "add";
const id = params.get("id");
return { mode, id };
};

export default function UserCrudForm({ onSaved }) {
const { mode: initialMode, id: initialId } = useMemo(() => parseQuery(), []);

const [mode, setMode] = useState(initialMode);
const [id, setId] = useState(initialId);

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");
const [team, setTeam] = useState("");
const [status, setStatus] = useState("Active");
const [joined, setJoined] = useState("");
const navigate = useNavigate();

useEffect(() => {
setMode(initialMode);
setId(initialId);
}, [initialMode, initialId]);

useEffect(() => {
let isMounted = true;

const loadForEdit = async () => {
if (mode !== "edit" || !id) return;
setLoading(true);
setError(null);
try {
const all = await getUsers();
const u = (Array.isArray(all) ? all : []).find((x) => String(x.id) === String(id));
if (!u) {
throw new Error("User not found");
}
if (!isMounted) return;
setName(u.name ?? "");
setEmail(u.email ?? "");
setRole(u.role ?? "");
setTeam(u.team ?? "");
setStatus(u.status ?? "Active");
setJoined(u.joined ?? u.joinedAt ?? "");
} catch (e) {
if (!isMounted) return;
setError(e);
} finally {
if (isMounted) setLoading(false);
}
};

loadForEdit();
return () => {
isMounted = false;
};
}, [mode, id]);

const handleSubmit = async (e) => {
e?.preventDefault?.();
setLoading(true);
setError(null);

const payload = {
name,
email,
role,
team,
status,
joined,
};

try {
if (mode === "edit" && id) {
await updateUser(id, payload);
} else {
await addUser(payload);
}

onSaved?.();
// Return to users table
navigate("/users");} catch (e2) {
setError(e2);
} finally {
setLoading(false);
}
};

const handleDelete = async () => {
if (!id) return;

// Avoid deleting when the page is used as a controlled "Delete" action link.
// Only allow deletion from the explicit delete button on the form.
const ok = window.confirm("Delete this user?");
if (!ok) return;

setLoading(true);
setError(null);
try {
await deleteUser(id);
onSaved?.();
} catch (e2) {
setError(e2);
} finally {
setLoading(false);
}
};

return (
  <>


<main className="dashboard-content">
<div className="container-fluid px-3 px-lg-4 py-4">
  <div className="page-heading">
<div className="page-heading-copy">
<span className="page-icon"><i className="bi bi-person-plus" aria-hidden="true"></i></span>
<div>
<p className="eyebrow mb-1">Management</p>
<h1 className="h3 mb-1">Add User</h1>
<p className="text-muted mb-0">Create a new user account with role and team assignments.</p>
</div>
</div>
<div className="heading-actions"><Link className="btn btn-outline-secondary btn-sm" to="/Users"><i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Users</Link></div>
</div>
<section className="panel mt-3">
<div className="panel-header">
<div>
<h2 className="h5 mb-1 section-title">
<i className="bi bi-person-plus" aria-hidden="true"></i>
<span>{mode === "edit" ? "Edit User" : "Add User"}</span>
</h2>
<p className="text-muted mb-0">Create or update team member accounts.</p>
</div>
<div className="d-flex flex-wrap gap-2">
<Link className="btn btn-outline-secondary btn-sm" href="/Users">
<i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Users
</Link>
</div>
</div>

{loading ? <div className="text-muted">Saving...</div> : null}
{error ? <div className="text-danger">Failed: {String(error.message || error)}</div> : null}

<div className="p-3">
<form onSubmit={handleSubmit} className="row g-3">
<div className="col-md-6">
<label className="form-label">Name</label>
<input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
</div>
<div className="col-md-6">
<label className="form-label">Email</label>
<input
className="form-control"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
<div className="col-md-6">
<label className="form-label">Role</label>
<select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
<option value="">Choose role</option>
<option>Admin</option>
<option>Manager</option>
<option>Editor</option>
<option>Viewer</option>
</select>
</div>
<div className="col-md-6">
<label className="form-label">Team</label>
<select className="form-select" value={team} onChange={(e) => setTeam(e.target.value)} required>
<option value="">Choose team</option>
<option>Operations</option>
<option>Sales</option>
<option>Content</option>
<option>Finance</option>
</select>
</div>
<div className="col-md-6">
<label className="form-label">Status</label>
<select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
<option>Active</option>
<option>Pending</option>
<option>Suspended</option>
</select>
</div>
<div className="col-md-6">
<label className="form-label">Joined</label>

<input className="form-control" value={joined} onChange={(e) => setJoined(e.target.value)} placeholder="e.g. Jan 12, 2026" />
</div>

<div className="col-12 d-flex flex-wrap gap-2 justify-content-end mt-2">
{mode === "edit" ? (
<button type="button" className="btn btn-outline-danger cobtn" onClick={handleDelete} disabled={loading}>
<i className="bi bi-trash" aria-hidden="true"></i> Delete
</button>
) : null}
<div className="col-12"><label className="form-label" for="notes">Notes</label><textarea className="form-control" id="notes" rows="4" placeholder="Optional onboarding notes"></textarea></div>

<button type="submit" className="btn btn-primary cobtn" disabled={loading}>
<i className="bi bi-person-check" aria-hidden="true"></i> {mode === "edit" ? "Save" : "Add User"}
</button>

</div>
</form>
</div>

</section>
</div>
</main>
</>
);
}

