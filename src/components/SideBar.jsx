import Avatar from "../img/avatar.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = (e) => {
    e.preventDefault();
    

    const next = !isOpen;
    setIsOpen(next);

    // desktop state
    document.body.classList.toggle("sidebar-mini", !next);

    // mobile state
    document.body.classList.toggle("sidebar-open", next);
  };



  return (
    <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <Link  className="nav-link active"
          to="/"
          aria-current="page"
             onClick={toggleSidebar}
        >
          <span className="brand-icon">
            <i className="bi bi-emoji-laughing-fill" aria-hidden="true"></i>
          </span>
          <span className="brand-copy">
            <span className="brand-title">Queen Coder</span>
          </span>
        </Link>
      </div>
      {/* NAV */}
      <nav className="sidebar-nav">
        <Link
          className="nav-link active"
          to="/"
          aria-current="page"
        
        >
          <span className="nav-icon">
            <i className="bi bi-speedometer2" aria-hidden="true"></i>
          </span>
          <span className="nav-text naV">Dashboard</span>
        </Link>


        <Link className="nav-link" to="/Users">
          <span className="nav-icon">
            <i className="bi bi-people" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Users</span>
        </Link>

        <Link className="nav-link" to="/AddUsers">
          <span className="nav-icon">
            <i className="bi bi-person-plus" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Add User</span>
        </Link>

        <Link className="nav-link" to="/Profile">
          <span className="nav-icon">
            <i className="bi bi-person-badge" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Profile</span>
        </Link>

        <Link className="nav-link" to="/ChannelMix">
          <span className="nav-icon">
            <i className="bi bi-bar-chart-line" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Charts</span>
        </Link>

        <Link className="nav-link" to="/Forms">
          <span className="nav-icon">
            <i className="bi bi-ui-checks-grid" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Forms</span>
        </Link>

        <Link className="nav-link active" to="/Tables" aria-current="page">
          <span className="nav-icon">
            <i className="bi bi-table" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Tables</span>
        </Link>

        <Link className="nav-link" to="/Alert">
          <span className="nav-icon">
            <i className="bi bi-exclamation-triangle" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Alerts</span>
        </Link>
      </nav>

      <div className="sidebar-user">
        <img
          className="avatar-img avatar-md sidebar-user-avatar"
          src={Avatar}
          alt="Admin Somaya"
        />
        <strong>Admin Somaya</strong>
        <small>Active Workspace</small>
      </div>

      <div className="sidebar-footer">
        <span className="status-dot"></span>
        <span className="sidebar-footer-text">System running smoothly</span>
      </div>
    </aside>
  );
}

export default Sidebar;

