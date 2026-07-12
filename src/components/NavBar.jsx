import React, { useContext, useMemo, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../img/avatar.jpg";
import Responsive from "./Responsive";

const notificationIcons = {
user: "bi-person-fill",
ticket: "bi-ticket-perforated-fill",
revenue: "bi-cash-coin",
profile: "bi-person-check-fill",
};

const NavBar = ({ activities = [], onSidebarToggle }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme?.darkMode ?? false;
  const toggleTheme = theme?.toggleTheme ?? (() => {});

  const [localActivities, setLocalActivities] = useState(activities);



  useEffect(() => {
    setLocalActivities(activities);
  }, [activities]);

  const unreadCount = useMemo(

    () => (localActivities ?? []).filter((a) => !a?.read).length,
    [localActivities]
  );


  const handleNotificationClick = (id) => {
    setLocalActivities((prev) =>
      (prev ?? []).map((a) =>
        a.id === id ? { ...a, read: true } : a
      )
    );
  };


 const handleMarkAllAsRead = () => {
    setLocalActivities((prev) =>
      (prev ?? []).map((a) => ({ ...a, read: true }))
    );
  };

  const MAX_NOTIFICATIONS = 20;

  const notifications = useMemo(
    () => (localActivities ?? []).slice(0, MAX_NOTIFICATIONS),
    [localActivities]
  );

  const handleSidebarToggle = () => {
    const nextOpen = !document.body.classList.contains("sidebar-open");

    // Mobile: slide sidebar in/out
    document.body.classList.toggle("sidebar-open", nextOpen);
    document.body.classList.toggle("sidebar-closed", !nextOpen);

    // Desktop: use mini mode
    document.body.classList.toggle("sidebar-mini", nextOpen);

    if (onSidebarToggle) onSidebarToggle(nextOpen);
  };


return (
  <>
  <Responsive/>

<nav className="navbar admin-navbar navbar-expand bg-white">
<div className="container-fluid px-3 px-lg-4">

{/* Sidebar Toggle */}
<button 
className="sidebar-toggle"
type="button"
onClick={handleSidebarToggle}
>
<span></span>
<span></span>
<span></span>
</button>

{/* Search */}
<form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
<input
className="form-control search-input"
type="search"
placeholder="Search users, orders, reports"
aria-label="Search"
/>
</form>

<div className="navbar-actions ms-auto">

{/* Theme Toggle */}
 <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
        >
          <i
            className={darkMode ? "bi bi-sun" : "bi bi-moon-stars"}
          />
        </button>

{/* Notifications */}
<div className="dropdown">
<button
className="icon-button"
type="button"
data-bs-toggle="dropdown"
aria-expanded="false"
aria-label="Notifications"
>
<span
className="notification-dot"
style={{ opacity: unreadCount > 0 ? 1 : 0 }}
></span>

<i className="bi bi-bell"></i>

{unreadCount > 0 && (
<span className="notification-badge">
{unreadCount}
</span>
)}
</button>

<div className="dropdown-menu dropdown-menu-end notification-menu">
<div className="dropdown-header notification-header">
<h6 className="mb-0">Notifications</h6>
{unreadCount > 0 && (
<small className="text-muted">
{unreadCount} unread
</small>
)}
</div>

{unreadCount > 0 && (
<div className="notification-actions-row">
<button
type="button"
className="btn btn-sm btn-danger mark-all-read-btn"
                onClick={handleMarkAllAsRead}
>
Mark all as read
</button>
</div>
)}

<div className="notification-list">
{notifications.length === 0 ? (
<div className="notification-empty">
<div className="notification-empty-icon">
<i className="bi bi-bell"></i>
</div>
<div className="notification-empty-title">
No notifications
</div>
<div className="notification-empty-subtitle">
You’re all caught up.
</div>
</div>
) : (
notifications.map((activity) => {
const isRead = !!activity?.read;

return (
  
<div
className="notification-item"
key={activity.id}
>
<div className="notification-icon">
<i
className={
notificationIcons[
activity.eventType ?? activity.type
] || "bi bi-bell-fill"
}
/>
</div>

<a
href="#"
className={`dropdown-item ${
isRead
? "notification-read"
: "notification-unread"
}`}
onClick={(e) => {
e.preventDefault();
handleNotificationClick(activity.id);
}}
>
<span className="notification-title">
{activity.message}
</span>
<span className="notification-time">
{activity.time}
</span>
</a>
</div>
);
})
)}
</div>
</div>
</div>

{/* Profile */}
<div className="dropdown">
<button
className="profile-button dropdown-toggle"
type="button"
data-bs-toggle="dropdown"
aria-expanded="false"
>
<img
className="avatar-img avatar-sm"
src={logo}
alt="Admin"
/>
<span className="profile-name d-none d-sm-inline">
Admin Somaya
</span>
</button>

<ul className="dropdown-menu dropdown-menu-end">
<li>
<a className="dropdown-item" href="#">
Profile
</a>
</li>
<li>
<a className="dropdown-item" href="#">
Account settings
</a>
</li>
<li>
<hr className="dropdown-divider" />
</li>
<li>
<a className="dropdown-item" href="#">
Sign out
</a>
</li>
</ul>
</div>

</div>
</div>
</nav>

</>
);
};

export default NavBar;