import React from 'react'

const ManageUsers = () => {
  return (
   <>
   <section className="panel mt-3">
<div className="panel-header">
<div>
<h2 className="h5 mb-1 section-title"><i className="bi bi-people" aria-hidden="true"></i><span>Recent Users</span></h2>
<p className="text-muted mb-0">Latest account activity across the workspace.</p>
</div>
<a className="btn btn-outline-secondary btn-sm" href="users.html">Manage Users</a>
</div>
<div className="table-responsive">
<table className="table align-middle mb-0">
<thead><tr><th scope="col">User</th><th scope="col">Role</th><th scope="col">Team</th><th scope="col">Status</th><th scope="col">Joined</th><th scope="col" className="text-end">Action</th></tr></thead>
<tbody>
<tr>
<td>
<div className="d-flex align-items-center gap-2">
{/* <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-1.jpg" alt="Sarah Ahmed"> */}
<div>
<p className="fw-semibold mb-0">Sarah Ahmed</p>
<p className="text-muted small mb-0">sarah@example.com</p>
</div>
</div>
</td>
<td>Admin</td>
<td>Operations</td>
<td><span className="badge text-bg-success">Active</span></td>
<td>Jan 12, 2026</td>
<td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
</tr>
<tr>
<td>
<div className="d-flex align-items-center gap-2">
{/* <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-2.jpg" alt="Rafi Khan"> */}
<div>
<p className="fw-semibold mb-0">Rafi Khan</p>
<p className="text-muted small mb-0">rafi@example.com</p>
</div>
</div>
</td>
<td>Manager</td>
<td>Sales</td>
<td><span className="badge text-bg-success">Active</span></td>
<td>Feb 03, 2026</td>
<td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
</tr>
<tr>
<td>
<div className="d-flex align-items-center gap-2">
{/* <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-3.jpg" alt="Nadia Islam"> */}
<div>
<p className="fw-semibold mb-0">Nadia Islam</p>
<p className="text-muted small mb-0">nadia@example.com</p>
</div>
</div>
</td>
<td>Editor</td>
<td>Content</td>
<td><span className="badge text-bg-warning">Pending</span></td>
<td>Mar 18, 2026</td>
<td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
</tr>
<tr>
<td>
<div className="d-flex align-items-center gap-2">
{/* <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-4.jpg" alt="Mina Torres"> */}
<div>
<p className="fw-semibold mb-0">Mina Torres</p>
<p className="text-muted small mb-0">mina@example.com</p>
</div>
</div>
</td>
<td>Viewer</td>
<td>Finance</td>
<td><span className="badge text-bg-secondary">Suspended</span></td>
<td>Apr 07, 2026</td>
<td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
</tr>
<tr>
<td>
<div className="d-flex align-items-center gap-2">
{/* <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-5.jpg" alt="Jon Oliver"> */}
<div>
<p className="fw-semibold mb-0">Jon Oliver</p>
<p className="text-muted small mb-0">jon@example.com</p>
</div>
</div>
</td>
<td>Analyst</td>
<td>Data</td>
<td><span className="badge text-bg-success">Active</span></td>
<td>Apr 22, 2026</td>
<td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
</tr>
</tbody>
</table>
</div>
</section>

   </> 

  )
}

export default ManageUsers
